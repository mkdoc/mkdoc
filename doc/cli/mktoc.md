# Name

mktoc - generates a table of contents index

# Synopsis

```
[options]
```

# Options

+ `-t, --title=[TITLE]` Set initial heading
+ `-l, --level=[NUM]` Set level for initial heading
+ `-d, --depth=[LEVEL]` Ignore headings below LEVEL
+ `-m, --max=[LEVEL]` Ignore headings above LEVEL
+ `-p, --prefix=[VAL]` Set link destination prefix to VAL
+ `-b, --base=[URL]` Base URL for absolute links
+ `-B, --bullet=[CHAR]` Character for bullet lists
+ `-E, --delimiter=[CHAR]` Delimiter for ordered lists
+ `-D, --disable` Disable automatic links
+ `-o, --ordered` Create an ordered list
+ `-s, --standalone` Standalone index, discards input
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

<? @include {=include} mktoc-example.md ?>
