var doc = require('../../index')
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
