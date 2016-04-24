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

+ `-r, --range` Execute a range query
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Description

Applies the selectors specified on the command line to the documents written to stdin; writes the matched nodes to stdout.

# See Also

mkfilter(1)
