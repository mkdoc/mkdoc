## Command Line Tools

### mk

Runs tasks in build files, by default searches for `mkdoc.js` in the current working directory and parent directories.

```shell
mk
```

When called with no arguments if a `main` task is available it is invoked otherwise all tasks are executed in sequence.

Specified tasks are executed in sequence:

```shell
mk api readme
```

See the [mkdoc.js](/mkdoc.js) file for an example and [mktask][] for information on creating task functions.

[mktask][] | [mk help][mktask help]

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

[mkcat][] | [mkcat help][]

### mkpi

Include markdown documents, source files and the output of commands:

```shell
mkcat doc/readme.md | mkpi | mkout > README.md
```

This program parses and executes processing instructions such as `<? @include intro.md install.md ?>`.

You can inline macro functions for application-specific logic or create custom macro functions that may be shared between projects, see the [mkpi docs][mkpi] for more details.

[mkpi][] | [mkpi help][cli help]

### mkmsg

Appends or prepends a document to the stream:

```shell
mkcat doc/readme.md | mkpi | mkmsg | mkout > README.md
```

Typically used to append a generator message but may be used to inject any document at the beginning or end of the stream.

[mkmsg][] | [mkmsg help][cli help]

### mkref

Collates link references and appends them to the stream.

```shell
mkcat doc/readme.md | mkpi | mkref | mkout > README.md
```

[mkref][] | [mkref help][cli help]

### mkabs

Make relative links absolute using the data in `package.json` if no base URL is given.

```shell
mkcat doc/readme.md | mkpi | mkref | mkabs | mkout > README.md
```

[mkabs][] | [mkabs help][cli help]

### mkout

Render a stream to markdown, XML, HTML and JSON.

```shell
mkcat file.md | mkout --html
```

[mkout][] | [mkout help][cli help]

### mkparse

Parse comments and tag annotations from source files.

```shell
mkparse index.js > index.doc.js
```

Low-level parser for working with comments and tag annotations, see [mkparse][]. The command line interface provides the means to quickly inspect the comments in a document, extract comments to a separate file or strip comments from a document.

[mkparse][] | [mkparse help][cli help]

### mkapi

Generate API documentation from comments in source files.

```shell
mkapi index.js lib/*.js --title=API > API.md
```

[mkapi][] | [mkapi help][cli help]
