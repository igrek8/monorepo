# pgmcli

## 3.0.0

### Major Changes

- da5cb56: Replaced `-n` parameter with `--until` parameter to specify which migrations the tool should apply or revert migrations until. In addition, migrations are run in a single transaction to avoid undetermenistic behaviour.
