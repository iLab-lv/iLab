const fs=require('node:fs'), path=require('node:path'), crypto=require('node:crypto');
const admin=require('firebase-admin');
const {execute,validate}=require('./firestoreContentCorrections.cjs');
require('dotenv').config({path:'.env.local',quiet:true});
const manifestPath='docs/release-r7/FAQ_CONTENT_CORRECTIONS.firestore.json';
const backup='.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json';
const protectedFiles={
  [backup]:'1e6e1ccb50a9ed43ed706e9315e2a8c1b1ca6cd2e1859a5246969e696160a7cf',
  'tmp/devices.export.json':'8b66fdf84dbaa0ccfd9ee81f773cc828bb07519cc275c719606ab9be40910d87',
  'tmp/categories.export.json':'295dc803736ae67eedd0ba0689dc34968a3dc66ef722479c0cd7369056d9e1bc',
};
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function checkBackup(){for(const [file,expected] of Object.entries(protectedFiles)) if(hash(file)!==expected) throw Error('Protected backup hash mismatch: '+file);}
async function main(){
  const mode=process.argv[2];
  if(!['--dry-run','--apply'].includes(mode) || process.argv.length!==3) throw Error('Use --dry-run or --apply');
  if(process.env.FIREBASE_PROJECT_ID!=='ilab-v2' || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!=='ilab-v2' || process.env.FIRESTORE_EMULATOR_HOST) throw Error('Wrong project/environment');
  checkBackup();
  if(hash(manifestPath)!=='fdd4137f37bcf4863003cf529b2c40e3f98f8682a6e808b9d445cd1a3a67616d') throw Error('Reviewed manifest checksum changed');
  const manifest=JSON.parse(fs.readFileSync(manifestPath)); validate(manifest);
  const saved=JSON.parse(fs.readFileSync(backup));
  if(saved.projectId!=='ilab-v2' || saved.type!=='full-firestore-export') throw Error('Wrong backup');
  for(const p of manifest.patches){
    const doc=saved.collections[p.collection]?.docs.find(d=>d.id===p.documentId);
    if(!doc || p.path.reduce((v,k)=>v?.[k],doc.data)!==p.before) throw Error('Manifest/backup mismatch');
  }
  const credential=admin.credential.cert({projectId:process.env.FIREBASE_PROJECT_ID,clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n')});
  admin.initializeApp({credential,projectId:'ilab-v2'});
  const token=await credential.getAccessToken();
  const response=await fetch('https://firestore.googleapis.com/v1/projects/ilab-v2/databases/(default)',{headers:{Authorization:'Bearer '+token.access_token}});
  if(!response.ok) throw Error('Database identity check HTTP '+response.status);
  const database=await response.json();
  if(database.name!=='projects/ilab-v2/databases/(default)' || database.locationId!=='europe-central2') throw Error('Wrong database identity');
  const startedAt=new Date().toISOString();
  const db=admin.firestore();
  const result=await execute(db,manifest,mode==='--apply');
  checkBackup();
  const summary={mode,projectId:'ilab-v2',database:database.name,location:database.locationId,startedAt,finishedAt:new Date().toISOString(),manifestSha256:hash(manifestPath),documents:result.entries.length,documentsUpdated:mode==='--apply'?result.entries.filter(e=>e.changes.length).length:0,pendingOrAppliedFields:result.pending,alreadyAppliedFields:result.already,conflicts:0,failures:0,warrantyFields:result.entries.flatMap(e=>e.changes).filter(p=>p.reason.startsWith('General')).length,locationFields:result.entries.flatMap(e=>e.changes).filter(p=>p.reason.startsWith('Current')).length,fullDocumentReadbackVerified:mode==='--apply',protectedHashesVerified:true,changes:result.entries.flatMap(e=>e.changes.map(p=>({document:e.id,path:p.path,reason:p.reason})))};
  // Fixed, separate output namespace; no arbitrary output path or backup writer.
  const dir=path.resolve('.env-stage2-results');fs.mkdirSync(dir,{recursive:true});
  const file=path.join(dir,Date.now()+'-'+mode.slice(2)+'-'+crypto.randomBytes(5).toString('hex')+'.json');
  fs.writeFileSync(file,JSON.stringify(summary,null,2),{flag:'wx'});
  console.log(JSON.stringify({...summary,changes:undefined,resultFile:file},null,2));
}
main().catch(error=>{console.error('STOPPED: '+error.message);process.exitCode=1;});
