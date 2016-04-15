# Name

mkpage - convert a document to an HTML page

# Synopsis

```
[options]
```

# Options

* `-o, --output=[FILE] {=stdout}` Write output to FILE
* `-d, --doctype=[VAL] {=<!doctype html>}` Doctype declaration
* `-l, --lang=[VAL] {=en-us}` Language attribute 
* `-t, --title=[VAL]` Document title
* `-s, --style=[PATH...]` Stylesheet paths for link elements
* `-c, --css=[FILE] :file:_files -g '*.css'` Create css element from FILE
* `-j, --javascript=[FILE] :file:_files -g '*.js'` Create script element from FILE
* `-f, --favicon=[PATH]` Path to use for a favicon
* `--html-[ATTR]=[VAL...]` Set attributes on the html element
* `--meta-[NAME]=[DESC...]` Set meta data in document head
* `--body-[ATTR]=[VAL...]` Set attributes on the body element
* `--element=[NAME]` Container element for the input document 
* `--attr-[NAME]=[VAL...]` Set attributes on container element
* `--header=[FILE]` Include file at start of document body
* `--footer=[FILE]` Include file at end of document body
* `-h, --help` Display help and exit
* `--version` Print the version and exit

