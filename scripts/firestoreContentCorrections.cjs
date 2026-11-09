// One-time executor for the reviewed 534-patch manifest. No backup writes.
const { isDeepStrictEqual } = require('node:util');
const replacements = [
  ['90 dienu garantiju', 'garantiju līdz 1 gadam'], ['90 dienu garantija', 'garantija līdz 1 gadam'],
  ['гарантию 90 дней', 'гарантию до 1 года'], ['гарантия 90 дней', 'гарантия до 1 года'],
  ['Гарантия iLab 90 дней', 'Гарантия iLab до 1 года'], ['Гарантия 90 дней', 'Гарантия до 1 года'],
  ['iLab garantija 90 dienas', 'iLab garantija līdz 1 gadam'], ['Spice Home', 'Spice Life'],
];
const get = (value, path) => path.reduce((v, k) => v?.[k], value);
function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (value && Object.getPrototypeOf(value) === Object.prototype) return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,clone(v)]));
  return value; // Preserve native Firestore values and their types.
}
function validate(manifest) {
  if (manifest.version !== 1 || manifest.patches?.length !== 534) throw Error('Unrecognized manifest');
  const seen = new Set(), docs = new Set();
  for (const p of manifest.patches) {
    if (!['categories','devices','faqGroups'].includes(p.collection) || typeof p.documentId !== 'string' || p.documentId.includes('/') || !p.documentId) throw Error('Invalid document identity');
    if (!Array.isArray(p.path) || !p.path.length || p.path.some(k => !(typeof k === 'string' && k && !['__proto__','prototype','constructor'].includes(k) || Number.isInteger(k) && k >= 0))) throw Error('Invalid path');
    if (typeof p.before !== 'string' || typeof p.after !== 'string' || p.before === p.after) throw Error('Invalid values');
    let approved = p.before;
    for (const [a,b] of replacements) approved = approved.split(a).join(b);
    if (approved !== p.after) throw Error('Unapproved replacement');
    if (!['General repair warranty: up to one year','Current branch display name: Spice Life'].includes(p.reason)) throw Error('Unknown correction reason');
    if (p.path.some(k => ['id','locale','scopeType','scopeKey','order','isPublished','isHidden','createdAt','updatedAt'].includes(k))) throw Error('Protected metadata path');
    const key = p.collection+'/'+p.documentId+':'+JSON.stringify(p.path);
    if (seen.has(key)) throw Error('Duplicate patch');
    seen.add(key); docs.add(p.collection+'/'+p.documentId);
    if (p.collection === 'faqGroups' && (p.path[0] !== 'items' || p.path[1] !== p.questionIndex || !['q','aHtml','a','answerHtml','answer'].includes(p.path[2]) || p.path.length !== 3 || !p.expectedIdentity)) throw Error('Unrecognized FAQ patch');
  }
  if (docs.size !== 226) throw Error('Unexpected document count');
}
function plan(manifest, existing) {
  validate(manifest);
  const grouped = new Map();
  for (const p of manifest.patches) {
    const id = p.collection+'/'+p.documentId;
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id).push(p);
  }
  let pending=0, already=0;
  const entries=[];
  for (const [id,patches] of grouped) {
    const before=existing.get(id);
    if (!before) throw Error('Missing document: '+id);
    const after=clone(before), roots=new Set(), changes=[];
    for (const p of patches) {
      if (p.collection === 'faqGroups') {
        for (const [k,v] of Object.entries(p.expectedIdentity)) if (!isDeepStrictEqual(before[k],v)) throw Error('Identity conflict: '+id);
        const item=before.items?.[p.questionIndex];
        const questionPatch=patches.find(e=>e.questionIndex===p.questionIndex && e.path[2]==='q');
        if (!item || item.order!==p.questionOrder || !(item.q===p.question || questionPatch && item.q===questionPatch.after)) throw Error('FAQ item conflict: '+id);
      }
      const current=get(before,p.path);
      if (current===p.after) { already++; continue; }
      if (current!==p.before) throw Error('Value conflict: '+id+':'+JSON.stringify(p.path));
      const parent=get(after,p.path.slice(0,-1));
      parent[p.path.at(-1)]=p.after; roots.add(p.path[0]); pending++; changes.push(p);
    }
    entries.push({id,before,after,changes,update:Object.fromEntries([...roots].map(k=>[k,after[k]]))});
  }
  return {pending,already,entries};
}
async function execute(db,manifest,apply=false) {
  validate(manifest);
  const ids=[...new Set(manifest.patches.map(p=>p.collection+'/'+p.documentId))];
  const refs=ids.map(id=>db.doc(id));
  let result;
  if (apply) {
    result=await db.runTransaction(async tx=>{
      const snaps=await tx.getAll(...refs);
      const planned=plan(manifest,new Map(snaps.map((s,i)=>[ids[i],s.exists?s.data():null])));
      // All validation precedes any queued write; one atomic transaction.
      for(const e of planned.entries) if(e.changes.length) tx.update(db.doc(e.id),e.update);
      return planned;
    });
  } else {
    const snaps=await db.getAll(...refs);
    result=plan(manifest,new Map(snaps.map((s,i)=>[ids[i],s.exists?s.data():null])));
  }
  if (apply) {
    const snaps=await db.getAll(...refs);
    for(let i=0;i<snaps.length;i++) if(!snaps[i].exists || !isDeepStrictEqual(snaps[i].data(),result.entries[i].after)) throw Error('Full-document read-back mismatch: '+ids[i]);
  }
  return result;
}
module.exports={validate,plan,execute};
