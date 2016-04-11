# Name

mkcli - compiles markdown cli definitions

# Synopsis

```
[options] [files...]
```

# Description

Compiles markdown command line interface definitions to JSON and supplies renderers for converting the definitions to help files and man pages. If no files are given input from stdin is expected.

If an input file is a directory then the directory is scanned for files ending in `md` or `markdown`.

When files are given and no type is specified all types are created otherwise when reading from stdin the `json` output type is assumed.

Output files are overwritten if they already exist.

# Options

* `-p, --package=[FILE]` Use package descriptor
* `-t, --type=[TYPE] {json|help|man}` Output renderer type
* `-y, --style=[VAL] {col|list|cmd|usage}` Help output style
* `-c, --cols=[NUM] {=80}` Wrap help output at NUM
* `-s, --split=[NUM] {=26}` Split help columns at NUM
* `-d, --desc=[NUM]` Number of description paragraphs for help output
* `-i, --indent=[NUM] {=2}` Number of spaces for help indentation
* `-a, --align=[TYPE] {left|right}` Alignment of first help column
* `-u, --usage=[VAL] {=Usage:}` Set usage message for help synopsis
* `-f, --full` Do not compact compiled descriptor
* `-r, --recursive` Recursively load command definitions
* `-C, --colon` Append a colon to headings in help output
* `-S, --section=[PTN...]` Include sections matching patterns in help output
* `-H, --header` Include default header in help output
* `-F, --footer` Include default footer in help output
* `-N, --newline` Print leading newline when no header
* `-P, --preserve` Do not upper case headings in man output
* `-J, --json=[DIR]` Set output directory for json files
* `-T, --text=[DIR]` Set output directory for help text files
* `-M, --man=[DIR]` Set output directory for man pages
* `-Z, --zsh=[DIR]` Set output directory for zsh completion
* `dir: -o, --output=[DIR]` Set output directory for all types
* `-h, --help` Display help and exit
* `-v, --version` Print the version and exit

