# pgmcli

## 4.0.1

### Patch Changes

- 90212d9: Resolve package metadata and schema.json

## 4.0.0

### Major Changes

- 85fbeb4: Introduce migration params (@run, @transaction) and remove file based "always" migrations. Switch to ESM only

## 3.1.0

### Minor Changes

- d596c7d: Support migrations that are regularly applied regardless if they have already been previously applied. Use the file extensions `.always.sql`, `.always.js`, `.always.ts`, `.always.cjs`, `.always.mjs`, or `.always.mts` to designate a migration to be always applied. This is especially helpful for maintaining alignment between the schema and database objects like functions and triggers.

## 3.0.3

### Patch Changes

- cacc5ea: Switched back to use CommonJS until ESM is stable

## 3.0.2

### Patch Changes

- 27de3b5: Removed declaration and source-maps files from dist

## 3.0.1

### Patch Changes

- d3732b8: fix: create threw console.info is undefined

## 3.0.0

### Major Changes

- 18d26ef: Replaced `-n` parameter with `--until` parameter to specify which migrations the tool should apply or revert migrations until. In addition, migrations are run in a single transaction to avoid undetermenistic behaviour.
