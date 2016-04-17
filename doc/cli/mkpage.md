# Name

mkpage - convert a document to an HTML page

# Synopsis

```
[options]
```

# Options

* `-d, --doctype=[VAL] {=<!doctype html>}` Doctype declaration
* `-r, --charset=[VAL] {=utf-8}` Document charset
* `-l, --lang=[VAL] {=en-us}` Language attribute 
* `-t, --title=[VAL]` Document title
* `-s, --style=[PATH...]` Paths for link elements
* `-S, --script=[PATH...]` Paths for script elements
* `-c, --css=[FILE] :file:_files -g '*.css'` Create style element from FILE
* `-j, --javascript=[FILE] :file:_files -g '*.js'` Create script element from FILE
* `-f, --favicon=[PATH]` Path to use for a favicon
* `-m, --media=[VAL]` Set media attribute for stylesheets
* `--html-[ATTR]=[VAL...]` Set attributes on the html element
* `--meta-[NAME]=[DESC...]` Set meta data in document head
* `--body-[ATTR]=[VAL...]` Set attributes on the body element
* `--element=[NAME]` Container element for the input document 
* `--attr-[NAME]=[VAL...]` Set attributes on container element
* `--app=[PATH...]` Script elements before the end of the body
* `--header=[FILE]` Include file at start of document body
* `--footer=[FILE]` Include file at end of document body
* `--async` Add async attribute to script elements
* `-h, --help` Display help and exit
* `--version` Print the version and exit

# Doctype

The default doctype is for HTML5 use the `--doctype` option if you need an alternative document type.

# Charset

The document charset defaults to `utf-8` use the `--charset` option to specify a different character set.

# Language

The HTML attribute is always given a `lang` attribute which defaults to `en-us`; use the `--lang` option to specify a different language.

# Title

Use the `--title` option to set the page title; when no title is given the document does not contain a `<title>` element.

# Resources

You can add paths to external resources in the head of the document using the `--style` and `--script` options. For stylesheets a `<link rel="stylesheet" />` element is created for each `--style` option; whereas for `--script` a `<script>` element is created.

Sometimes you may wish to include inline styles and javascript in the head of the document. Use the `--css` option to add an inline stylesheet to the document head, the contents of the file are wrapped in a `<style>` element.

For inline javascript use the `--javascript` option in which case the file contents are wrapped in a `<script>` element.

The `--media` option may be used to add a `media` attribute for all stylesheets (inline and external):

```shell
mkcat README.md | mkpage --style=style.css --media=print | mkhtml
```

The `--async` option adds the `async` attribute to all generated `<script>` elements.

# Favicon

When the `--favicon` option is given a `<link rel="shortcut icon" />` element is created in the document head. The path given should have an extension of `.png` or `.ico` so that the MIME type can be inferred.

# Meta

Additional meta data such as `keywords` and `author` can be set in the document head using the `--meta-*` options:

```shell
mkcat README.md | mkpage --meta-author='Author' --meta-keywords='brochure' | mkhtml
```

These correspond to `<meta>` elements with the `name` and `content` attributes so the above command creates:

```html
<meta name="author" content="Author" />
<meta name="keywords" content="brochure" />
```

# Attributes

Element attributes may be set on the html and body elements which is useful if you wish to add class names to those attributes or other attributes. Use the `--html-*` and `--body-*` options:

```shell
mkcat README.md | mkpage --html-class='static-page' --body-data-id='identifier' | mkhtml
```

Creates the elements as `<html class="static-page" lang="en-us">` and `<body data-id="identifier">`.

# Content

To include a page header into the body content, specify a path to a file using the `--header` option and the file is loaded, parsed as markdown and injected in to the document after the open of the body element but before the input document.

The `--footer` option is handled the same way as `--header` except the resulting document is injected after the input document and before the body element is closed.

# Container

A container element allows wrapping the input document in a named element which is useful for selectors that need to target elements in the input markdown document. Use the `--element` option to create a container element, when this option is given you can specify attributes to set on the container element:

```shell
mkcat README.md | mkpage --element section --attr-class="article" | mkhtml
```

Creates an element `<section class="article">` that contains the input markdown document.

# Application

The `--app` option is effectively the same as `--script` (generates `<script>` elements) except that the generated elements appear before the close of the body element. This allows injecting javascript files that will execute after the DOM has been loaded. These script elements appear after any container element or footer; that is they are guaranteed to be the final elements before the close of the body element.

# Bugs

The `async` attribute cannot be selectively applied to certain `<script>` elements.
