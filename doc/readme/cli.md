## Command Line Tools

Command line interfaces to a suite of [commonmark][] processing tools.

### mkcat

Reads one or more markdown documents and serializes them to the output stream, this program is normally used at the beginning of a transform pipeline before being sent to `mkout`:

```shell
mkcat file.md | mkout --xml
```

It can also accept input from `stdin`:

```shell
cat file.md | mkcat | mkout
```

However this is not recommended because file path information is lost which is important for some processing tools such as [mkpi][] which uses the file path to resolve relative include files.

#### Usage

<?@exec {} mkcat -h ?>

### mkpi

Include markdown documents, source files and the output of commands:

```shell
mkcat doc/readme.md | mkpi | mkout > README.md
```

This program parses and executes processing instructions such as `<? @include intro.md install.md ?>`.

You can inline macro functions for application-specific logic or create custom macro functions that may be shared between projects, see the [mkpi docs][mkpi] for more details.

#### Usage

<?@exec {} mkpi -h ?>

### mkgen

Appends or prepends a document node to the stream:

```shell
mkcat doc/readme.md | mkpi | mkgen | mkout > README.md
```

Typically used to append a generator message but may be used to inject any document at the beginning or end of the stream.

#### Usage

<?@exec {} mkgen -h ?>

### mkout

Render a serializerd stream to markdown, XML, HTML and JSON.

```shell
mkcat file.md | mkout --html
```

#### Usage

<?@exec {} mkout -h ?>

### mkparse

Parse comments and tag annotations from source files.

```shell
mkparse index.js > index.doc.js
```

Low-level parser for working with comments and tag annotations, see [mkparse][]. The command line interface provides the means to quickly inspect the comments in a document, extract comments to a separate file or strip comments from a document.

#### Usage

<?@exec {} mkparse -h ?>

### mkapi

Generate API documentation from comments.

#### Usage

<?@exec {} mkapi -h ?>
