const test=require('node:test'), assert=require('node:assert/strict');
const manifest=require('../docs/release-r7/FAQ_CONTENT_CORRECTIONS.firestore.json');
const {validate,plan,execute}=require('../scripts/firestoreContentCorrections.cjs');
function fixture(){
  const records=new Map();
  for(const p of manifest.patches){
    const id=p.collection+'/'+p.documentId;
    if(!records.has(id)) records.set(id,{...p.expectedIdentity,untouched:{value:'keep'},updatedAt:'unchanged'});
    const doc=records.get(id);
    let node=doc;
    for(let i=0;i<p.path.length-1;i++) node=node[p.path[i]]??=(typeof p.path[i+1]==='number'?[]:{});
    node[p.path.at(-1)]=p.before;
    if(p.collection==='faqGroups') Object.assign(doc.items[p.questionIndex],{q:p.question,order:p.questionOrder,custom:'keep'});
  }
  return records;
}
test('manifest scope and exact replacements; nested updates preserve siblings and metadata; rerun is idempotent',()=>{
  const before=fixture(),result=plan(manifest,before);
  assert.equal(result.pending,534);assert.equal(result.entries.length,226);
  for(const e of result.entries){assert.equal(e.after.updatedAt,'unchanged');assert.deepEqual(e.after.untouched,{value:'keep'});}
  assert.equal(plan(manifest,new Map(result.entries.map(e=>[e.id,e.after]))).already,534);
  assert.equal(plan(manifest,new Map(result.entries.map(e=>[e.id,e.after]))).pending,0);
  assert.equal(plan(manifest,before).pending,534);
});
test('third values, missing documents, FAQ order/identity conflicts and unapproved replacements fail',()=>{
  const p=manifest.patches[0],id=p.collection+'/'+p.documentId;
  const docs=fixture();docs.get(id)[p.path[0]][p.path[1]]='concurrent edit';
  assert.throws(()=>plan(manifest,docs),/conflict/);
  const missing=fixture();missing.delete(id);assert.throws(()=>plan(manifest,missing),/Missing/);
  const faq=manifest.patches.find(p=>p.collection==='faqGroups'),changed=fixture();changed.get('faqGroups/'+faq.documentId).items[faq.questionIndex].order=999;
  assert.throws(()=>plan(manifest,changed),/FAQ item conflict/);
  const bad=structuredClone(manifest);bad.patches[0].after+=' unapproved';assert.throws(()=>validate(bad),/Unapproved/);
});
test('transaction validates all reads before writes and read-back checks full documents',async()=>{
  const docs=fixture(),writes=[];
  const snap=ref=>({exists:docs.has(ref),data:()=>docs.get(ref)});
  const db={doc:id=>id,getAll:async(...refs)=>refs.map(snap),runTransaction:async fn=>fn({getAll:async(...refs)=>refs.map(snap),update:(id,update)=>{writes.push(id);docs.set(id,{...docs.get(id),...update});}})};
  const result=await execute(db,manifest,true);assert.equal(result.pending,534);assert.equal(writes.length,226);
  const again=await execute(db,manifest,true);assert.equal(again.already,534);assert.equal(writes.length,226);
  const first=manifest.patches[0];docs.get(first.collection+'/'+first.documentId)[first.path[0]][first.path[1]]='edit';
  await assert.rejects(execute(db,manifest,true),/conflict/);assert.equal(writes.length,226);
});
