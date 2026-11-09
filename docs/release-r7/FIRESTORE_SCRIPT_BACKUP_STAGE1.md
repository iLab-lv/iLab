# R7.4E.4 Stage 1 — existing-script Firestore backup

**Status: backup completed and independently verified. No content corrections or migration performed.** This records the subsequent user-authorized script backup; the earlier managed-export failure in FIRESTORE_BACKUP_STAGE1.md remains historical. No managed export was retried.

## Method and destination

- Verified project: **ilab-v2**, matching server/public configuration and live database discovery; database **(default)**.
- Existing, unchanged script: `scripts/exportFirestoreDatabase.cjs`. Uses Firebase Admin with existing environment credentials, read-only document queries and recursive subcollection discovery. No credential contents were printed or copied.
- Backup: `.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json` (relative to `C:/Users/info/Desktop/website/iLab`).
- Started: **2026-11-06T17:27:45.313Z**. File exportedAt: **2026-11-06T17:41:06.331Z**. Process finished: **2026-11-06T17:41:06.478Z**, exit **0**. All times UTC.
- File size: **4,699,582 bytes**. Stored in an existing Git-ignored path; contains private database content and must not be committed.
- SHA-256: `1e6e1ccb50a9ed43ed706e9315e2a8c1b1ca6cd2e1859a5246969e696160a7cf`.
- Beside the payload: `export.log`, `verification.json`, `verify.log`, `SHA256SUMS`.

Run used the existing script with EXPORT_PATH set to the unique destination above; equivalent Git Bash invocation:

```bash
EXPORT_PATH='.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json' node scripts/exportFirestoreDatabase.cjs
```

The destination was checked absent and created uniquely; do not rerun this command at that same path because the existing script overwrites its output file.

## Coverage and verification

**17 root collections / 4,156 existing documents; zero subcollections found.** The exporter has no collection allowlist and recursively exports subcollections below returned documents. An independent read-only traversal used listDocuments (including missing-parent references) and nested collection discovery: no omitted documents, missing-parent references or nested collections were found in this database.

| Collection | Documents |
|---|---:|
| categories | 4 |
| devices | 211 |
| faqGroups | 26 |
| modelServices | 1240 |
| places | 2 |
| servicePricing | 1655 |
| services | 22 |
| settings | 1 |
| shopDevices | 181 |
| shopInquiries | 1 |
| shopInvoiceSequences | 1 |
| shopInvoices | 5 |
| shopOrders | 5 |
| shopProductTypes | 8 |
| shopProducts | 787 |
| shopSettings | 2 |
| users | 5 |

- Independent live read: **2026-11-06T17:41:07.729Z** to **2026-11-06T17:42:42.052Z**. Root counts, all document paths and every serialized document value matched; zero missing/extra paths or changed serialized values.
- Correction manifest: **226/226 documents present**, **534/534 before-value fields matched**, zero missing documents or precondition mismatches. Coverage: categories 4, devices 208, faqGroups 14.
- JSON parses; collection counts match arrays; document paths and uniqueness validated. A separate `sha256sum -c SHA256SUMS` returned **OK**.
- Earlier inspected exports remain byte-for-byte unchanged (SHA-256 checked): `tmp/categories.export.json` — 4 records, exported 2026-05-28T20:25:10.352Z; `tmp/devices.export.json` — 208 records, exported 2026-07-13T21:00:06.501Z. These earlier files are collection exports. The exporter source hash also remains unchanged.
- Native-value inspection found 4,813 timestamp fields, all millisecond-aligned; zero byte fields, nonfinite numbers, references, GeoPoints or plain maps misclassified as GeoPoints. Thus no timestamp truncation or those unsupported-value cases were observed in the independently read current data.

## Restore capability and limitations

This is the project's custom JSON export, **not a Firestore native export or a proven lossless restore artifact**. No compatible generic full-database restore script/decoder was found. Existing collection-specific imports are not a verified restore path for this nested format. No restore was run.

A future separately authorized restore must first verify SHA-256, validate project/path/counts, then use a reviewed importer that recursively restores saved document paths and decodes timestamp/GeoPoint/reference tags. Test against an isolated database/emulator, compare paths/counts/types/values, and only then consider a separately approved production restore. The operator needs source-file access and target database document-write IAM permissions (for example an appropriate datastore user/custom role), plus database access. Do not pass this JSON to the managed Firestore import command.

Restoring matching paths can overwrite newer production values; restoring this file alone does not remove newer documents absent from it. Back up the target first. No ready-to-run production restore command is claimed.

Exporter limitations: timestamps are converted to ISO milliseconds (nanoseconds below milliseconds cannot be recovered if present); integer/double distinctions and document system create/update metadata are not retained; bytes/nonfinite values lack reliable round-trip encoding; reference tags retain paths only; GeoPoint detection uses latitude/longitude duck typing. Its collection queries can miss descendants below nonexistent parent documents; independent traversal found none here. Sequential reads are not an atomic snapshot. Matching the subsequent live read establishes observed coverage/value agreement, not transactional consistency. Security Rules, indexes, Auth accounts and Storage objects are outside this Firestore document backup.

No production Firestore writes, corrections, missing FAQ group creation, Rules changes, application changes, replacement/deletion of earlier backups, commit, push or deployment were performed. **Stopped after backup verification.**
