// R7.4E.5: exact six-record, create-only production migration.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { isDeepStrictEqual } from 'node:util';
import { validateMigrationManifest, planFaqMigration, applyFaqMigration } from '../lib/faq/faqMigration.mjs';
const require=createRequire(import.meta.url);
const manifestPath='lib/faq/faqMigration.manifest.json';
const manifest=JSON.parse(fs.readFileSync(manifestPath));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const protectedFiles={
  '.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json':'1e6e1ccb50a9ed43ed706e9315e2a8c1b1ca6cd2e1859a5246969e696160a7cf',
  'tmp/devices.export.json':'8b66fdf84dbaa0ccfd9ee81f773cc828bb07519cc275c719606ab9be40910d87',
  'tmp/categories.export.json':'295dc803736ae67eedd0ba0689dc34968a3dc66ef722479c0cd7369056d9e1bc',
};
function verifyBackups(){for(const[file,expected]of Object.entries(protectedFiles))if(hash(file)!==expected)throw Error('Protected backup mismatch: '+file);}
function checkContent(){
  if(hash(manifestPath)!=='6af5528c8e721282285dc5c698d44f8486a400f4b2f7c520ac500bca85570bf7')throw Error('Reviewed manifest checksum changed');
  validateMigrationManifest(manifest);
  for(const doc of manifest.documents){
    if(doc.data.order!==(doc.data.scopeType==='page'?20:10))throw Error('Wrong group order');
    if(!doc.data.title || Object.keys(doc.data).sort().join(',')!=='isPublished,items,locale,order,scopeKey,scopeType,title')throw Error('Unexpected schema');
    for(const item of doc.data.items){
      if(/spice[\s_-]*home|(?:90|9|3)[\s-]*(?:days?|dien\p{L}*|дн\p{L}*|mēne\p{L}*|меся\p{L}*|months?)/iu.test(item.q+' '+item.aHtml))throw Error('Obsolete content');
      for(const match of item.aHtml.matchAll(/href\s*=\s*["']([^"']+)/gi))if(!/^(?:\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(match[1]))throw Error('Unsafe answer link');
    }
  }
}
async function main(){
  const mode=process.argv[2];if(!['--dry-run','--apply'].includes(mode)||process.argv.length!==3)throw Error('Use --dry-run or --apply');
  require('dotenv').config({path:'.env.local',quiet:true});
  if(process.env.FIREBASE_PROJECT_ID!=='ilab-v2'||process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!=='ilab-v2'||process.env.FIRESTORE_EMULATOR_HOST)throw Error('Wrong environment');
  checkContent();verifyBackups();
  const admin=require('firebase-admin');
  const credential=admin.credential.cert({projectId:'ilab-v2',clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n')});
  const token=await credential.getAccessToken();
  const response=await fetch('https://firestore.googleapis.com/v1/projects/ilab-v2/databases/(default)',{headers:{Authorization:'Bearer '+token.access_token}});
  if(!response.ok)throw Error('Identity check HTTP '+response.status);
  const database=await response.json();if(database.name!=='projects/ilab-v2/databases/(default)'||database.locationId!=='europe-central2')throw Error('Wrong database');
  const app=admin.initializeApp({credential,projectId:'ilab-v2'}),db=app.firestore();
  try{
    const startedAt=new Date().toISOString(),before=await db.collection('faqGroups').get();
    const approved=new Set(manifest.documents.map(d=>d.id));
    const original=before.docs.filter(d=>!approved.has(d.id));
    if(original.length!==26)throw Error('Unexpected original group count');
    const existing=new Map(before.docs.filter(d=>approved.has(d.id)).map(d=>[d.id,d.data()]));
    const preflight=planFaqMigration(manifest,existing);
    for(const [id,data]of existing){
      const expected=manifest.documents.find(d=>d.id===id).data;
      if(Object.keys(data).some(k=>!Object.hasOwn(expected,k)&&!['createdAt','updatedAt'].includes(k)))throw Error('Unexpected existing fields: '+id);
      if(!(data.createdAt instanceof admin.firestore.Timestamp)||!(data.updatedAt instanceof admin.firestore.Timestamp))throw Error('Existing timestamps missing: '+id);
    }
    const backCoverIds=['service_aizmugures-vacina-maina_lv','service_aizmugures-vacina-maina_ru'];
    if(before.docs.some(d=>backCoverIds.includes(d.id)))throw Error('Unexpected back-cover group');
    let plan=preflight;
    if(mode==='--apply')plan=await applyFaqMigration(db,manifest,admin.firestore.FieldValue.serverTimestamp());
    const after=await db.collection('faqGroups').get();
    const afterMap=new Map(after.docs.map(d=>[d.id,d]));
    for(const doc of original){const current=afterMap.get(doc.id);if(!current||!isDeepStrictEqual(doc.data(),current.data())||!doc.updateTime.isEqual(current.updateTime))throw Error('Original record changed: '+doc.id);}
    if(mode==='--apply')for(const doc of manifest.documents){
      const actual=afterMap.get(doc.id)?.data();
      if(!actual || !isDeepStrictEqual(Object.fromEntries(Object.keys(doc.data).map(k=>[k,actual[k]])),doc.data))throw Error('Read-back mismatch: '+doc.id);
      if(!(actual.createdAt instanceof admin.firestore.Timestamp)||!(actual.updatedAt instanceof admin.firestore.Timestamp))throw Error('Invalid timestamps: '+doc.id);
    }
    if(after.size!==(mode==='--apply'?32:before.size))throw Error('Unexpected final collection size');
    if(after.docs.some(d=>backCoverIds.includes(d.id)))throw Error('Back-cover unexpectedly present');
    verifyBackups();
    const summary={mode,projectId:'ilab-v2',database:database.name,location:database.locationId,startedAt,finishedAt:new Date().toISOString(),manifestSha256:hash(manifestPath),created:mode==='--apply'?plan.filter(p=>p.action==='create').length:0,wouldCreate:mode==='--dry-run'?plan.filter(p=>p.action==='create').length:0,alreadyExisting:plan.filter(p=>p.action==='unchanged').length,conflicts:0,createdItems:mode==='--apply'?plan.filter(p=>p.action==='create').reduce((n,p)=>n+p.after.items.length,0):0,original26Unchanged:true,backupHashesVerified:true,readbackVerified:mode==='--apply',finalFaqDocuments:after.size,backCoverAbsent:true,documents:manifest.documents.map(d=>({id:d.id,scopeType:d.data.scopeType,scopeKey:d.data.scopeKey,locale:d.data.locale,questions:d.data.items.length,order:d.data.order,action:plan.find(p=>p.id===d.id).action}))};
    fs.mkdirSync('.env-stage3-results',{recursive:true});
    const output='.env-stage3-results/'+Date.now()+'-'+mode.slice(2)+'-'+crypto.randomBytes(5).toString('hex')+'.json';
    fs.writeFileSync(output,JSON.stringify(summary,null,2),{flag:'wx'});console.log(JSON.stringify({...summary,resultFile:output},null,2));
  }finally{await app.delete();}
}
main().catch(error=>{console.error('STOPPED: '+error.message);process.exitCode=1;});
