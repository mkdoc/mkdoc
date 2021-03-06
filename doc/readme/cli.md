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

[Source Code][mktask] | [CLI Help][mktask help]

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

[Source Code][mkcat] | [CLI Help][mkcat help]

### mkpi

Include markdown documents, source files and the output of commands:

```shell
mkcat doc/readme.md | mkpi | mkout > README.md
```

This program parses and executes processing instructions such as `<? @include intro.md install.md ?>`.

You can inline macro functions for application-specific logic or create custom macro functions that may be shared between projects, see the [mkpi docs][mkpi] for more details.

[Source Code][mkpi] | [CLI Help][mkpi help]

### mkmsg

Appends or prepends a document to the stream:

```shell
mkcat doc/readme.md | mkpi | mkmsg | mkout > README.md
```

Typically used to append a generator message but may be used to inject any document at the beginning or end of the stream.

[Source Code][mkmsg] | [CLI Help][mkmsg help]

### mkref

Collates link references and appends them to the stream.

```shell
mkcat doc/readme.md | mkpi | mkref | mkout > README.md
```

[Source Code][mkref] | [CLI Help][mkref help]

### mkabs

Make relative links absolute using the data in `package.json` if no base URL is given.

```shell
mkcat doc/readme.md | mkpi | mkref | mkabs | mkout > README.md
```

[Source Code][mkabs] | [CLI Help][mkabs help]

### mkfilter

Filters nodes by type from a stream.

To remove all headings from a document:

```shell
mkcat doc/readme.md | mkfilter --heading | mkout
```

Remove everything but code blocks from a document:

```shell
mkcat doc/readme.md | mkfilter --code-block --invert | mkout
```

[Source Code][mkfilter] | [CLI Help][mkfilter help]

### mklevel

Converts heading levels, use this to indent or outdent headings.

To increment all headings:

```shell
mkcat README.md | mklevel --all=1 | mkout
```

To convert level 3 headings to level 2:

```shell
mkcat README.md | mklevel -3=-1 | mkout
```

[Source Code][mklevel] | [CLI Help][mklevel help]

### mktransform

Add stream classes from files to a pipeline:

```shell
mkcat README.md | mktransform file.js transformer.js | mkout
```

[Source Code][mktransform] | [CLI Help][mktransform help]

### mktoc

Create a standalone table of contents:

```shell
mkcat README.md | mktoc -s | mkout > TOC.md
```

Inject the table of contents into a document containing the `<!-- @toc -->` marker:

```shell
mkcat README.md | mktoc | mkout > README.md
```

[Source Code][mktoc] | [CLI Help][mktoc help]

### mkhigh

Highlight code blocks with ANSI escape characters suitable for printing to a terminal:

```shell
mkcat README.md | mkhigh -o esc | mkout
```

Generate a standalone HTML page with highlighted code blocks converted to `<pre>` elements:

```shell
mkcat README.md | mkhigh | mkpage | mkhtml > README.html
```

This program requires that [source-highlight][] is installed.

[Source Code][mkhigh] | [CLI Help][mkhigh help]

### mkpage

Create an HTML page:

```shell
mkcat file.md | mkpage --title=TITLE --style=style.css | mkout --html
```

[Source Code][mkpage] | [CLI Help][mkpage help]

### mkout

Render a stream to markdown, XML, HTML and JSON.

```shell
mkcat file.md | mkout --html
```

There are also some specialized output programs for certain types that expose more options:

* [mkman](https://github.com/mkdoc/mkout#mkman) - render to man page
* [mktext](https://github.com/mkdoc/mkout#mktext) - render to plain text
* [mkhtml](https://github.com/mkdoc/mkout#mkhtml) - render to HTML page

[Source Code][mkout] | [CLI Help][mkout help]

### mkparse

Parse comments and tag annotations from source files.

```shell
mkparse index.js > index.doc.js
```

Low-level parser for working with comments and tag annotations, see [mkparse][]. The command line interface provides the means to quickly inspect the comments in a document, extract comments to a separate file or strip comments from a document.

[Source Code][mkparse] | [CLI Help][mkparse help]

### mkapi

Generate API documentation from comments in source files.

```shell
mkapi index.js lib/*.js --title=API > API.md
```

[Source Code][mkapi] | [CLI Help][mkapi help]
