## Usage

<? @source {javascript=s/(\.\.\/)+index/mkdoc/gm} usage.js ?>

The equivalent command line:

```shell
mkcat doc/readme.md | mkpi | mkmsg | mkref | mkout
```

But the stream pipeline version will be faster as it does not need to launch multiple processes and does not convert the stream to JSON.

Sample input is the [source file](/doc/readme.md) for this document.

