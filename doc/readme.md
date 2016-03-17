# Markdown Tools

<? @include readme/badges.md ?>

> Make markdown documents

Creates stream pipelines that converts input [commonmark][] to an abstract syntax tree and transforms the tree; the result is then typically converted back to markdown, HTML or XML.

<? @include readme/install.md ?>

## Usage

<? @source {javascript=s/\.\.\/index/mkdoc/gm} usage.js ?>

<? @include {=readme}
      cli.md
      license.md
      links.md ?>
