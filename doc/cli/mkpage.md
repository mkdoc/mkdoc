# Name

mkpage - convert a document to an HTML page

# Synopsis

```
[options]
```

# Options

* `-d, --doctype=[VAL] {=<!doctype html>}` Doctype declaration
* `-r, --charset=[VAL] {=utf-8}` Document charset
* `-l, --lang=[VAL] {=en-us}` Language attribute 
* `-t, --title=[VAL]` Document title
* `-s, --style=[PATH...]` Paths for link elements
* `-S, --script=[PATH...]` Paths for script elements
* `-c, --css=[FILE] :file:_files -g '*.css'` Create style element from FILE
* `-j, --javascript=[FILE] :file:_files -g '*.js'` Create script element from FILE
* `-f, --favicon=[PATH]` Path to use for a favicon
* `--html-[ATTR]=[VAL...]` Set attributes on the html element
* `--meta-[NAME]=[DESC...]` Set meta data in document head
* `--body-[ATTR]=[VAL...]` Set attributes on the body element
* `--element=[NAME]` Container element for the input document 
* `--attr-[NAME]=[VAL...]` Set attributes on container element
* `--app=[PATH...]` Script elements before the end of the body
* `--header=[FILE]` Include file at start of document body
* `--footer=[FILE]` Include file at end of document body
* `--async` Add async attribute to script elements
* `-h, --help` Display help and exit
* `--version` Print the version and exit

