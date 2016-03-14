Table of Contents
=================

* [Markdown Tools](#markdown-tools)
  * [Install](#install)
  * [Usage](#usage)
    * [mkcat](#mkcat)
    * [mkout](#mkout)
    * [mkparse](#mkparse)
    * [mkapi](#mkapi)
  * [Developer](#developer)
    * [Test](#test)
    * [Cover](#cover)
    * [Lint](#lint)
    * [Clean](#clean)
    * [Readme](#readme)

Markdown Tools
==============

[<img src="https://travis-ci.org/mkdoc/mkdoc.svg?v=2" alt="Build Status">](https://travis-ci.org/mkdoc/mkdoc)
[<img src="http://img.shields.io/npm/v/mkdoc.svg?v=2" alt="npm version">](https://npmjs.org/package/mkdoc)
[<img src="https://coveralls.io/repos/mkdoc/mkdoc/badge.svg?branch=master&service=github&v=2" alt="Coverage Status">](https://coveralls.io/github/mkdoc/mkdoc?branch=master).

Command line interfaces to the suite of markdown processing tools.

## Install

```
npm i -g mkdoc
```

## Usage

### mkcat

Concatenate markdown documents to an AST.

```
mkcat [options] [files...]

  --no-ast    Disable AST output, prints input.
  -h, --help  Display this help and exit.
  --version   Print the version and exit.

Report bugs to https://github.com/mkdoc/mkcat/issues
```

### mkout

Render an AST to markdown, XML, HTML and JSON.

```
mkout [options] [files...]

  -m, --md           Set output renderer to markdown (default).
  -h, --html         Set output renderer to HTML.
  -x, --xml          Set output renderer to XML.
  -j, --json         Pass through input JSON.
  -t, --type [TYPE]  Set the output renderer type.
  -o, --output       Write to file (default: stdout).
  --help             Display this help and exit.
  --version          Print the version and exit.

Report bugs to https://github.com/mkdoc/mkout/issues
```

### mkparse

Parse comments and tags (annotations) from source file(s).

```
mkparse [options] [files...]

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

```
mkapi [options] [files...]

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

## Developer

### Test

To run the test suite:

```
npm test
```

### Cover

To generate code coverage run:

```
npm run cover
```

### Lint

Run the source tree through [jshint](http://jshint.com) and [jscs](http://jscs.info):

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Readme

To build the readme file from the partial definitions (requires [mdp](https://github.com/tmpfs/mdp)):

```
npm run readme
```

Generated by [mdp(1)](https://github.com/tmpfs/mdp).

[jshint]: http://jshint.com
[jscs]: http://jscs.info
[commonmark]: https://github.com/jgm/commonmark.js
[mdp]: https://github.com/tmpfs/mdp
