# pgmcli

## 3.0.2

### Patch Changes

- 27de3b5: Removed declaration and source-maps files from dist

## 3.0.1

### Patch Changes

- d3732b8: fix: create threw console.info is undefined

## 3.0.0

### Major Changes

- 18d26ef: Replaced `-n` parameter with `--until` parameter to specify which migrations the tool should apply or revert migrations until. In addition, migrations are run in a single transaction to avoid undetermenistic behaviour.
