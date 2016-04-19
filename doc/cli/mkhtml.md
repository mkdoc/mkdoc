# Name

mkhtml - render to HTML page

# Synopsis

```
[flags] [options]
```

# Options

+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Example

Convert a document to HTML:

```shell
mkcat README.md | mkhtml > README.html
```

Note this is not a full HTML page use mkpage(1) to wrap the generated markup in a complete page.

# See Also

mkout(1), mkpage(1)
