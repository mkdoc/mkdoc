## Usage

This example illustrates how to create a readme file like this one from a [source file](/doc/readme.md) and some [include files](/doc/readme):

<? @source {javascript=s/(\.\.\/)+index/mkdoc/gm} usage.js ?>

The equivalent command line:

```shell
mkcat doc/readme.md | mkpi | mkref | mkmsg | mkout
```

But the javascript version will be faster as it does not need to launch multiple processes and does not convert the stream to JSON.
