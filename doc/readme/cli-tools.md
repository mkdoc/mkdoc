## Command Line Tools

### mkcat

Reads one or more markdown documents and serializes them to the output stream, this program is typically used at the beginning of a transform pipeline before being sent to `mkout`:

```shell
mkcat file.md | mkout --xml
```

<?@exec {} mkcat -h ?>

### mkpi

Include markdown documents, source files and the output of commands:

```shell
mkcat doc/readme.md | mkpi | mkout > README.md
```

This program parses and executes processing instructions such as `<? @include intro.md install.md ?>`, see the [mkpi docs][] for more details.

<?@exec {} mkpi -h ?>

### mkgen

Appends or prepends a document to a stream.

```shell
mkcat doc/readme.md | mkpi | mkgen | mkout > README.md
```

<?@exec {} mkgen -h ?>

### mkout

```shell
mkcat file.md | mkout --html
```

Render a serializerd stream to markdown, XML, HTML and JSON; default output is markdown.

<?@exec {} mkout -h ?>

### mkparse

Parse comments and tag annotations from source files.

<?@exec {} mkparse -h ?>

### mkapi

Generate API documentation from comments.

<?@exec {} mkapi -h ?>

