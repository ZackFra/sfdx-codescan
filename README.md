# sfdx-codescan

This repository includes a re-usable GitHub action to run the PMD codescanner configured to Apex using the sfdx-codescan plugin. 

## To Use

```
jobs:
  code-scan-pull-request:
    runs-on: ubuntu-latest
    steps:
      - name: Run Code Scan
        uses: ZackFra/sfdx-codescan@master
```

## Parameters
max-severity
* Optional
* This is the maximum acceptable severity for a PMD violation
* Can be any integer between 0 and 5.
  * 1 is the highest severity level, 5 is the lowest.
  * Defaults to 5.
  * Setting this to 0 means all violations are acceptable.
