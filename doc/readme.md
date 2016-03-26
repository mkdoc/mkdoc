# Markdown Tools

<? @include readme/badges.md ?>

> Make markdown documents

Creates stream pipelines that convert input [commonmark][] to an abstract syntax tree and transforms the tree; the result is then typically converted back to markdown or to another format such as HTML, XML or JSON.

<? @include readme/install.md ?>

***
<!-- @toc -->
***

<? @include {=readme}
      features.md
      usage.md
      modules.md
      cli.md ?>

<? @exec mkapi index.js --level=2 --title=API ?>

<? @include {=readme}
      license.md
      links.md ?>
