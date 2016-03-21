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

## Usage

This example illustrates how to create a readme file like this one from a [source file](https://github.com/mkdoc/mkdoc/blob/master/doc/readme.md) and some [include files](https://github.com/mkdoc/mkdoc/blob/master/doc/readme):

```javascript
var doc = require('mkdoc')
  , pi = require('mkpi')
  , msg = require('mkmsg')
  , ref = require('mkref')
  , out = require('mkout');

doc('doc/readme.md')          // read markdown source document
  .pipe(pi())                 // parse processing instructions, includes etc.
  .pipe(ref())                // include link references
  .pipe(msg())                // append generator message
  .pipe(out())                // convert abstract syntax tree to markdown
  .pipe(process.stdout);      // print the document
```

The equivalent command line:

```shell
mkcat doc/readme.md | mkpi | mkmsg | mkref | mkout
```

But the javascript version will be faster as it does not need to launch multiple processes and does not convert the stream to JSON.

## Command Line Tools

Command line interfaces to a suite of [commonmark][] processing tools.

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

#### Usage

```
mk [task...]

Task runner.

  -f, --file=[FILE...]  Load specific task files
  --tasks               Print task comments
  -h, --help            Display this help and exit
  --version             Print the version and exit

Report bugs to https://github.com/mkdoc/mktask/issues
```

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

```
mkcat [options] [files...]

Concatenate source files to an abstract syntax tree.

  --no-ast    Disable AST output, prints input
  -h, --help  Display this help and exit
  --version   Print the version and exit

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

```
mkpi [options]

Processing instruction macros.

  -p, --preserve  Do not remove processing instructions
  -h, --help      Display this help and exit
  --version       Print the version and exit

Report bugs to https://github.com/mkdoc/mkpi/issues
```

### mkmsg

Appends or prepends a document to the stream:

```shell
mkcat doc/readme.md | mkpi | mkmsg | mkout > README.md
```

Typically used to append a generator message but may be used to inject any document at the beginning or end of the stream.

#### Usage

```
mkmsg [options]

Message injection.

  -m, --message=[MSG]  Custom message, parsed as markdown
  -p, --prepend        Prepend message to the stream
  -h, --help           Display this help and exit
  --version            Print the version and exit

Report bugs to https://github.com/mkdoc/mkmsg/issues
```

### mkref

Collates link references and appends them to the stream.

```shell
mkcat doc/readme.md | mkpi | mkref | mkout > README.md
```

#### Usage

```
mkref [options]

Link reference collation.

  -h, --help  Display this help and exit
  --version   Print the version and exit

Report bugs to https://github.com/mkdoc/mkref/issues
```

### mkabs

Make relative links absolute using the data in `package.json` if no base URL is given.

```shell
mkcat doc/readme.md | mkpi | mkref | mkabs | mkout > README.md
```

#### Usage

```
mkabs [options]

Make relative links absolute.

  -b, --base=[URL]       Base URL for absolute links
  -r, --relative=[PATH]  Relative path when repository url
  -h, --help             Display this help and exit
  --version              Print the version and exit

Report bugs to https://github.com/mkdoc/mkabs/issues
```

### mkout

Render a stream to markdown, XML, HTML and JSON.

```shell
mkcat file.md | mkout --html
```

#### Usage

```
mkout [options]

Render an abstract syntax tree.

  -d, --md             Set output renderer to markdown (default)
  -m, --html           Set output renderer to HTML
  -x, --xml            Set output renderer to XML
  -j, --json           Pass through input JSON
  -t, --type=[TYPE]    Set the output renderer type
  -o, --output=[FILE]  Write output to FILE (default: stdout)
  -h, --help           Display this help and exit
  --version            Print the version and exit

Report bugs to https://github.com/mkdoc/mkout/issues
```

### mkparse

Parse comments and tag annotations from source files.

```shell
mkparse index.js > index.doc.js
```

Low-level parser for working with comments and tag annotations, see [mkparse][]. The command line interface provides the means to quickly inspect the comments in a document, extract comments to a separate file or strip comments from a document.

#### Usage

```
mkparse [options] [files...]

Parse source file comments.

  -l, --lang=[LANG]   Set language for all files
  -s, --strip         Print content only, remove comments
  -c, --content       Include non-comment content
  -d, --dotted        Parse dotted names
  -j, --json          Print comments as JSON
  -i, --indent=[NUM]  Number of spaces for JSON (default: 0)
  -h, --help          Display this help and exit
  --version           Print the version and exit

Report bugs to https://github.com/mkdoc/mkparse/issues
```

### mkapi

Generate API documentation from comments.

#### Usage

```
mkapi [options] [files...]

Documentation generator.

  -o, --output=[FILE]  Write output to FILE (default: stdout)
  -t, --title=[VAL]    Title for initial heading
  -l, --level=[NUM]    Initial heading level (default: 1)
  -L, --lang=[LANG]    Language for fenced code blocks (default: javascript)
  -i, --indent=[NUM]   Number of spaces for JSON (default: 2)
  -a, --ast            Print AST as JSON
  --[no]-private       Enable or disable private symbols
  --[no]-protected     Enable or disable protected symbols
  -h, --help           Display this help and exit
  --version            Print the version and exit

Report bugs to https://github.com/mkdoc/mkapi/issues
```

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

Generated by [mkdoc](https://github.com/mkdoc/mkdoc).

[mkcat]: https://github.com/mkdoc/mkcat
[mkpi]: https://github.com/mkdoc/mkpi
[mkmsg]: https://github.com/mkdoc/mkmsg
[mkout]: https://github.com/mkdoc/mkout
[mkparse]: https://github.com/mkdoc/mkparse
[mkapi]: https://github.com/mkdoc/mkapi
[mktask]: https://github.com/mkdoc/mktask
[jshint]: http://jshint.com
[jscs]: http://jscs.info
[commonmark]: http://commonmark.org/
[commonmark.js]: https://github.com/jgm/commonmark.js

