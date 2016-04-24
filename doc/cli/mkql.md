# Name

mkql - query documents with selectors

# Synopsis

```
[flags] [options] <selector...>
```

```
[flags] [options] --range <start-selector> [end-selector]
```

# Options

+ `-d, --delete` Remove matched nodes
+ `-p, --preserve` Preserve text when deleting
+ `-r, --range` Execute a range query
+ `-m, --multiple` Include multiple ranges
+ `-n, --newline` Add line break between matches
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Description

Applies the selectors specified on the command line to the documents written to stdin; writes the matched nodes to stdout.

# See Also

mkfilter(1)
