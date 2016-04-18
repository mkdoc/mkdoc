# Name

mktransform - custom stream transformations

# Synopsis

```
[files...]
```

```zsh
*:file:_files -g '*.js'
```

# Description

Processes the input stream on stdin using the specified stream transformation files.

# Options

+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

<? @include {=include} mktransform-guide.md mktransform-example.md ?>
<? @include {=../../node_modules/mktransform/doc/readme} links.md ?>
