# Name

mkman - render to troff man page

# Synopsis

```
[options]
```

# Options

+ `-t, --title=[VAL] {=UNTITLED}` Set the page title
+ `-s, --section=[NUM] {=1}` Set the section number
+ `-i, --inline=[VAL] {=strong}` Inline code rendering style
+ `-l, --locale=[VAL] {=en-gb}` Locale for automatic date generation
+ `-v, --preamble-version=[VAL] {=1.0}` Version for document preamble
+ `-d, --date=[VAL]` Use specific date
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Example

Render to a man page:

```shell
mkcat README.md | mkman --title README --section 7 > README.7
```

# See Also

mkout(1)
