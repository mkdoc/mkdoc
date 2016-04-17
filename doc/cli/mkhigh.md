# Name

mkhigh - highlight code blocks

# Synopsis

```
[options]
```

# Options

* `-o, --out=[VAL] {=html}` Set output format
* `-s, --src=[LANG]` Source language overrides info string
* `-l --lines` Number lines in output
* `-p, --preserve` Keep code elements
* `-h, --help` Display help and exit
* `--version` Print the version and exit

# Description

For each code block in the stream with an info string attempt to convert the code to a highlighted version using source-highlight(1).

To see the available source languages available to the `--src` option:

```shell
source-highlight --lang-list
```

For output formats available to the `--out` option run:

```shell
source-highlight --outlang-list
```

# Example

To highlight code blocks in a document with ANSI escape sequences:

```shell
mkcat README.md | mkhigh -o esc | mkout
```

To highlight code blocks for a standalone HTML page:

```shell
mkcat README.md | mkhigh | mkpage | mkhtml > README.html
```

# See Also

source-highlight(1)
