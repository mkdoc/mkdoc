# Name

mkout - render to various output formats

# Synopsis

```
[options]
```

# Options

* `-o, --output=[FILE] {=stdout}` Write output to FILE
* `-H, --html` Set output renderer to HTML
* `-j, --json` Set output renderer to JSON
* `-m, --man` Set output renderer to MAN
* `-t, --text` Set output renderer to TEXT
* `-x, --xml` Set output renderer to XML
* `-y, --yaml` Set output renderer to YAML
* `-Y, --yaml-full` Do not compact YAML output
* `-n, --noop` Pass through input JSON
* `-h, --help` Display help and exit
* `--version` Print the version and exit

<? @include {=include} mkout-example.md ?>

# See Also

mkhtml(1), mkman(1), mktext(1)
