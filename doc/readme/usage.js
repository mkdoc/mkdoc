var doc = require('../../index')
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
  .pipe(toc())             // create and inject table of contents list
  .pipe(out())                // convert abstract syntax tree to markdown
  .pipe(process.stdout);      // print the document
