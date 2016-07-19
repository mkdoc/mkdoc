# API

## doc

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

