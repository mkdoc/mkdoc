# Markdown Tools

[![Build Status](https://travis-ci.org/mkdoc/mkdoc.svg?v=2)](https://travis-ci.org/mkdoc/mkdoc)
[![npm version](http://img.shields.io/npm/v/mkdoc.svg?v=2)](https://npmjs.org/package/mkdoc)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkdoc/badge.svg?branch=master&service=github&v=2)](https://coveralls.io/github/mkdoc/mkdoc?branch=master)

> Make markdown documents

Creates stream pipelines that converts input [commonmark][] to an abstract syntax tree and transforms the tree; the result is then typically converted back to markdown, HTML or XML.

## Install

```
npm i -g mkdoc
```

## Usage

```javascript
var doc = require('mkdoc')
  , pi = require('mkpi')
  , gen = require('mkgen')
  , out = require('mkout');

doc('doc/readme.md')
  .pipe(pi())
  .pipe(gen())
  .pipe(out())
  .pipe(process.stdout);
```

Sample input is the [source file](/doc/readme.md) for this document.

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

```null
mkcat [options] [files...]

Concatenate markdown to commonmark AST

  --no-ast    Disable AST output, prints input.
  -h, --help  Display this help and exit.
  --version   Print the version and exit.

Report bugs to https://github.com/mkdoc/mkcat/issues
```

### mkpi

Include markdown documents, source files and the output of commands:

```shell
mkcat doc/readme.md | mkpi | mkout > README.md
```

This program parses and executes processing instructions such as `<? @include intro.md install.md ?>`.

You can inline macro functions for application-specific logic or create custom macro functions that may be shared between projects, see the [mkpi docs][mkpi] for more details.

#### Usage

```null
mkpi [options]

Processing instruction macros

  -p, --preserve  Do not remove processing instructions.
  -h, --help      Display this help and exit.
  --version       Print the version and exit.

Report bugs to https://github.com/mkdoc/mkpi/issues
```

### mkgen

Appends or prepends a document node to the stream:

```shell
mkcat doc/readme.md | mkpi | mkgen | mkout > README.md
```

Typically used to append a generator message but may be used to inject any document at the beginning or end of the stream.

#### Usage

```null
mkgen [options]

Stream message injection

  -m, --message=[MSG]  Custom message, parsed as markdown.
  -p, --prepend        Prepend message to the stream.
  -h, --help           Display this help and exit.
  --version            Print the version and exit.

Report bugs to https://github.com/mkdoc/mkgen/issues
```

### mkout

Render a serializerd stream to markdown, XML, HTML and JSON; default output is markdown.

```shell
mkcat file.md | mkout --html
```

#### Usage

```null
mkout [options]

Output renderers for commonmark

  -d, --md             Set output renderer to markdown (default).
  -m, --html           Set output renderer to HTML.
  -x, --xml            Set output renderer to XML.
  -j, --json           Pass through input JSON.
  -t, --type=[TYPE]    Set the output renderer type.
  -o, --output=[FILE]  Write output to FILE (default: stdout).
  -h, --help           Display this help and exit.
  --version            Print the version and exit.

Report bugs to https://github.com/mkdoc/mkout/issues
```

### mkparse

Parse comments and tag annotations from source files.

```shell
mkparse index.js > index.doc.js
```

Low-level parser for working with comments and tag annotations, see [mkparse][]. The command line interface provides the means to quickly inspect the comments in a document, extract comments to a separate file or strip comments from a document.

#### Usage

```null
mkparse [options] [files...]

Generic comments parser

  -l, --lang=[LANG]   Set language for all files.
  -s, --strip         Print content only, remove comments.
  -c, --content       Include non-comment content.
  -d, --dotted        Parse dotted names.
  -j, --json          Print comments as JSON.
  -i, --indent=[NUM]  Number of spaces for JSON (default: 0).
  -h, --help          Display this help and exit.
  --version           Print the version and exit.

Report bugs to https://github.com/mkdoc/mkparse/issues
```

### mkapi

Generate API documentation from comments.

#### Usage

```null
mkapi [options] [files...]

Markdown api documentation generator

  -o, --output=[FILE]  Write output to FILE (default: stdout).
  -t, --title=[VAL]    Title for initial heading.
  -l, --level=[NUM]    Initial heading level (default: 1).
  -L, --lang=[LANG]    Language for fenced code blocks (default: javascript).
  -i, --indent=[NUM]   Number of spaces for JSON (default: 2).
  -a, --ast            Print AST as JSON.
  --[no]-private       Enable or disable private symbols
  --[no]-protected     Enable or disable protected symbols
  -h, --help           Display this help and exit.
  --version            Print the version and exit.

Report bugs to https://github.com/mkdoc/mkapi/issues
```

## License

MIT

Generated by [mkdoc](https://github.com/mkdoc/mkdoc).

[mkcat]: https://github.com/mkdoc/mkcat
[mkpi]: https://github.com/mkdoc/mkpi
[mkgen]: https://github.com/mkdoc/mkgen
[mkout]: https://github.com/mkdoc/mkout
[mkparse]: https://github.com/mkdoc/mkparse
[mkapi]: https://github.com/mkdoc/mkapi
[jshint]: http://jshint.com
[jscs]: http://jscs.info
[commonmark]: http://commonmark.org/
[commonmark.js]: https://github.com/jgm/commonmark.js
