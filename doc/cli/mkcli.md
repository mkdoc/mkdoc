# Name

mkcli - compiles markdown cli definitions

# Synopsis

```
[options]
```

# Description

Compiles markdown command line interface definitions to JSON and supplies renderers for converting the definitions to help files and man pages.

# Options

* `-p, --package=[FILE]` Use package descriptor
* `-t, --type=[TYPE] {json|help|man}` Output renderer type
* `-c, --cols=[NUM] {=80}` Wrap help output at NUM
* `-s, --split=[NUM] {=26}` Split help columns at NUM
* `-i, --indent=[NUM] {=2}` Number of spaces for help indentation
* `-a, --align=[TYPE] {left|right=left}` Align first help column left or right
* `-u, --usage=[VAL] {=Usage:}` Set usage message for help synopsis
* `-S, --section=[PTN...]` Include sections matching patterns in help output
* `-H, --header` Include default header in help output
* `-F, --footer` Include default footer in help output
* `-N, --newline` Print leading newline when no header
* `-h, --help` Display help and exit
* `--version` Print the version and exit

