var doc = require('../../index')
  , pi = require('mkpi')
  , msg = require('mkmsg')
  , ref = require('mkref')
  , out = require('mkout');

doc('doc/readme.md')
  .pipe(pi())
  .pipe(msg())
  .pipe(ref())
  .pipe(out())
  .pipe(process.stdout);
