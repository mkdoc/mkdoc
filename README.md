# Markdown Tools

[![Build Status](https://travis-ci.org/mkdoc/mkdoc.svg?v=2)](https://travis-ci.org/mkdoc/mkdoc)
[![npm version](http://img.shields.io/npm/v/mkdoc.svg?v=2)](https://npmjs.org/package/mkdoc)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkdoc/badge.svg?branch=master&service=github&v=2)](https://coveralls.io/github/mkdoc/mkdoc?branch=master)

> Make markdown documents

Creates stream pipelines that convert input [commonmark][] to an abstract syntax tree and transforms the tree; the result is then typically converted back to markdown or to another format such as HTML, XML or JSON.

## Install

```
npm i -g mkdoc
```

## Features

* Command line and programmatic control.
* Streaming build system, see [mktask][].
* DSL for including files, executing commands and more, see [mkpi][].
* Comment parser for 30+ languages, see [mkparse][].
* Fast, modular code with good coverage.

---

- [Install](#install)
- [Features](#features)
- [Usage](#usage)
- [Modules](#modules)
- [Command Line Tools](#command-line-tools)
  - [mk](#mk)
  - [mkcat](#mkcat)
  - [mkpi](#mkpi)
  - [mkmsg](#mkmsg)
  - [mkref](#mkref)
  - [mkabs](#mkabs)
  - [mkfilter](#mkfilter)
  - [mklevel](#mklevel)
  - [mktransform](#mktransform)
  - [mktoc](#mktoc)
  - [mkhigh](#mkhigh)
  - [mkpage](#mkpage)
  - [mkout](#mkout)
  - [mkparse](#mkparse)
  - [mkapi](#mkapi)
- [API](#api)
  - [doc](#doc)
- [License](#license)

---

## Usage

This example illustrates how to create a readme file like this one from a [source file](https://github.com/mkdoc/mkdoc/blob/master/doc/readme.md) and some [include files](https://github.com/mkdoc/mkdoc/blob/master/doc/readme):

```javascript
var doc = require('mkdoc')
  , pi = require('mkpi')
  , ref = require('mkref')
  , abs = require('mkabs')
  , msg = require('mkmsg')
  , toc = require('mktoc')
  , out = require('mkout');

doc('doc/readme.md')          // read markdown source document
  .pipe(pi())                 // parse processing instructions, includes etc.
  .pipe(ref())                // include link references
  .pipe(abs())                // make links absolute
  .pipe(msg())                // append generator message
  .pipe(toc())                // create and inject table of contents list
  .pipe(out())                // convert abstract syntax tree to markdown
  .pipe(process.stdout);      // print the document
```

The equivalent command line:

```shell
mkcat doc/readme.md | mkpi | mkref | mkabs | mkmsg | mktoc | mkout
```

But the javascript version will be faster as it does not need to launch multiple processes and does not convert the stream to JSON.

## Modules

Designed to be modular, a brief overview:

* [mktask][] is a streaming build system.
* [mkcat][] loads source markdown files.
* [mkast][] is a library for converting tree nodes to JSON.
* [mkpi][] parses processing instructions and runs macro functions.
* [mkmsg][] injects a message into a stream.
* [mkref][] injects link references into a stream.
* [mkabs][] makes links absolute.
* [mktoc][] creates a table of contents list.
* [mkfilter][] removes nodes from the stream by type.
* [mklevel][] changes heading levels.
* [mktransform][] add custom stream transformations to the pipeline.
* [mkout][] renders the tree to an output format (XML, HTML etc).
* [mkparse][] parses comments from source files.
* [mkapi][] generates API documentation from comments.

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

See the [mkdoc.js](https://github.com/mkdoc/mkdoc/blob/master/mkdoc.js) file for an example and [mktask][] for information on creating task functions.

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

## API

### doc

```javascript
doc(files[, opts])
```

Creates a stream pipeline using [mkcat][] from the given source files.

Rather than an array you can pass file paths in the form:

```javascript
doc('intro.md', 'install.md', {});
```

Returns an output stream.

* `files` Array source markdown files.
* `opts` Object processing options.

## License

MIT

---

Created by [mkdoc](https://github.com/mkdoc/mkdoc) on August 3, 2016

[mkcat]: https://github.com/mkdoc/mkcat
[mkast]: https://github.com/mkdoc/mkast
[mkfilter]: https://github.com/mkdoc/mkfilter
[mklevel]: https://github.com/mkdoc/mklevel
[mktransform]: https://github.com/mkdoc/mktransform
[mkpi]: https://github.com/mkdoc/mkpi
[mkmsg]: https://github.com/mkdoc/mkmsg
[mkref]: https://github.com/mkdoc/mkref
[mkabs]: https://github.com/mkdoc/mkabs
[mkpage]: https://github.com/mkdoc/mkpage
[mkout]: https://github.com/mkdoc/mkout
[mkparse]: https://github.com/mkdoc/mkparse
[mkapi]: https://github.com/mkdoc/mkapi
[mktoc]: https://github.com/mkdoc/mktoc
[mktask]: https://github.com/mkdoc/mktask
[mkcat help]: https://github.com/mkdoc/mkcat#help
[mkfilter help]: https://github.com/mkdoc/mkfilter#help
[mklevel help]: https://github.com/mkdoc/mklevel#help
[mktransform help]: https://github.com/mkdoc/mktransform#help
[mkpi help]: https://github.com/mkdoc/mkpi#help
[mkmsg help]: https://github.com/mkdoc/mkmsg#help
[mkref help]: https://github.com/mkdoc/mkref#help
[mkabs help]: https://github.com/mkdoc/mkabs#help
[mkpage help]: https://github.com/mkdoc/mkpage#help
[mkout help]: https://github.com/mkdoc/mkout#help
[mkparse help]: https://github.com/mkdoc/mkparse#help
[mkapi help]: https://github.com/mkdoc/mkapi#help
[mktoc help]: https://github.com/mkdoc/mktoc#help
[mktask help]: https://github.com/mkdoc/mktask#help
[mkhigh]: https://github.com/mkdoc/mkhighlight
[mkhigh help]: https://github.com/mkdoc/mkhighlight#help
[jshint]: http://jshint.com
[jscs]: http://jscs.info
[commonmark]: http://commonmark.org/
[commonmark.js]: https://github.com/jgm/commonmark.js
[source-highlight]: https://www.gnu.org/software/src-highlite/source-highlight.html

