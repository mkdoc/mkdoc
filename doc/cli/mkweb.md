# Name

mkweb - build a website

# Synopsis

```
[flags] [options] ... <file|dir>
```

# Options

+ `-o, --output=<DIR>` Write files to DIR
+ `-c, --conf=[FILE] :file:_files '+.yml'` Read YAML configuration from FILE
+ `-p, --pi` Execute processing instructions
+ `-s, --safe` Safe mode for instruction execution
+ `-b, --bundle=[FILE...]` Files to add to the asset bundle
+ `-t, --theme=[VAL]` Use stylesheet theme
+ `-f, --frontmatter` Parse inline frontmatter YAML
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Description

Reads input markdown documents and compiles each document to an HTML page, files are written to the directory specified using the `--output` option.

# Configuration

Set the global configuration using the `--conf` option if a file exists with a `.md.yml` extension it is used as a configuration specific to the file. If the `--frontmatter` option is specified inline YAML is parsed from the input documents; in this case the YAML must be at the beginning of the file (no preceeding characters).

For available configuration options see the documentation for mkpage(1).

# See Also

mkpage(1)
