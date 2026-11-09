# R7.4E.4 Stage 1 — full Firestore backup attempt

**Status: BLOCKED — no backup created or confirmed. Migration must not begin.**

## Verified configuration and access

- Project: **ilab-v2**, matching both `FIREBASE_PROJECT_ID` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID`. The live database-list API independently confirmed `projects/ilab-v2/databases/(default)` as the only database.
- Database: `(default)`, Native mode, location `europe-central2`. Point-in-time recovery is disabled; no configuration was changed.
- Authentication: existing server service-account environment, used in memory. No credential/key file was created, copied into the repository or printed. No alternative local Google ADC credentials or installed gcloud/Firebase CLI were found.
- Available method: official Firestore managed export through its REST API; CLI installation is not necessary.
- Existing storage: `gs://ilab-v2.firebasestorage.app`, region `EUROPE-NORTH1`. No database data was placed in the application's storage bucket. A dedicated private backup bucket in `europe-central2` is proposed for a successful retry.
- IAM preflight succeeded but omitted `datastore.databases.export` from granted permissions. Database metadata/operation read permissions and storage bucket creation/listing were available.
- Billing status could not be confirmed: Cloud Billing API returned 403 because that API is disabled/not previously used. This does **not** establish that billing itself is disabled. No API or billing setting was enabled.

## Attempt and verification

Attempted **2026-11-06 13:54:42.268 UTC / 15:54:42.268 Europe/Riga**.

Official endpoint:

`POST https://firestore.googleapis.com/v1/projects/ilab-v2/databases/(default):exportDocuments`

Request:

```json
{
  "collectionIds": [],
  "outputUriPrefix": "gs://ilab-v2-firestore-backup-20261106-073d2a6e/full-20261106T135442Z"
}
```

The empty collection filter requests the entire database, including every collection group/subcollection; it is not restricted to FAQ or correction-manifest records. The official native export format is the intended supported backup, rather than a custom JSON conversion. [Export API](https://docs.cloud.google.com/firestore/docs/reference/rest/v1/projects.databases/exportDocuments).

Result: **HTTP 403 `PERMISSION_DENIED`: “The caller does not have permission”.** No operation name, success status, export metadata, document counters or export files were returned. At **13:55:55.409 UTC**, a separate Storage metadata request for the proposed bucket returned **404: “The specified bucket does not exist.”**

The URI above is **only an attempted/proposed destination, not a usable backup**. Backup creation time: **none**. Completion/integrity: **not achieved**. Previous backups were neither overwritten nor inspected as substitutes.

## Safe route to completion

An authorized project administrator must either run the managed export through Cloud Console/Cloud Shell, or provide this account the required export access, normally Cloud Datastore Import Export Admin (or an equivalent custom role). The caller and Firestore service agent also require suitable access to the private destination bucket; verification requires object list/read access. Confirm billing eligibility. No IAM, service-agent, billing or storage-policy changes were made here. [Official prerequisites](https://firebase.google.com/docs/firestore/manage-data/export-import).

Use a newly dated unique prefix and a private bucket with public access prevention/uniform bucket access. Do not use the failed URI as evidence of an existing export. Example for an authorized administrator, **not executed**:

```bash
gcloud firestore export 'gs://PRIVATE_BACKUP_BUCKET/full-UTC_TIMESTAMP-UNIQUE_SUFFIX' \
  --project=ilab-v2 --database='(default)' --async
```

Omit collection filters. Retain the returned operation name and poll until `done=true` with no error and successful export metadata. Verify the exact output prefix, start/end times, collection/namespace filter scope, document/byte counters and complete `.overall_export_metadata` plus referenced data objects. Record object generations/checksums and immutable inventory. Validate recoverability by importing into a separately authorized isolated test database, never production during this stage. A partial export or document-only JSON dump is not an acceptable replacement.

## Restore procedure and limitations

After a **successful** export, an authorized operator can import its complete export prefix into the intended target database:

```bash
gcloud firestore import 'gs://PRIVATE_BACKUP_BUCKET/VERIFIED_EXPORT_PREFIX/' \
  --project=RESTORE_TARGET_PROJECT --database='RESTORE_TARGET_DATABASE'
```

Restore requires database import permission and bucket read access, with any necessary service-agent access. Existing IDs present in the export are overwritten; unrelated newer documents remain. Consequently, importing into production can overwrite newer values and is not an exact rollback of all later changes. Test isolated restoration first and back up the target before any separately approved production restore. Index definitions are not contained in this data export. [Official import behavior](https://firebase.google.com/docs/firestore/manage-data/export-import#import_data).

An ordinary managed export is not guaranteed to represent one instantaneous database state if production changes during export. PITR is currently disabled, so no point-in-time export was attempted. [Export consistency](https://docs.cloud.google.com/firestore/docs/reference/rest/v1/projects.databases/exportDocuments).

No current backup exists to restore or integrity-test. No production document write/update/delete, content correction, six-document creation, Security Rules change, application edit, commit, push or deployment occurred. Only this report was added to the repository. **Stage 1 remains incomplete pending authorized export access and a verified successful full backup.**
