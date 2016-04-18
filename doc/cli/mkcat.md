# Name

mkcat - reads markdown documents

# Synopsis

```
[options] [files...]
```

```zsh
:file:_files -g '*.md'
```

# Description

Reads markdown documents from stdin and files; writes serialized nodes to stdout.

The output is newline-delimited JSON records representing the abstract syntax tree for the input document(s).

# Options

* `-h, --help` Display help and exit
* `--version` Print the version and exit

<? @include {=include} mkcat-example.md ?>
