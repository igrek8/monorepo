---
'pgmcli': minor
---

Support migrations that are regularly applied regardless if they have already been previously applied. Use the file extensions `.always.sql`, `.always.js`, `.always.ts`, `.always.cjs`, `.always.mjs`, or `.always.mts` to designate a migration to be always applied. This is especially helpful for maintaining alignment between the schema and database objects like functions and triggers.
