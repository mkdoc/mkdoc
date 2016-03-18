var doc = require('../../index')
  , pi = require('mkpi')
  , gen = require('mkgen')
  , ref = require('mkref')
  , out = require('mkout');

doc('doc/readme.md')
  .pipe(pi())
  .pipe(gen())
  .pipe(ref())
  .pipe(out())
  .pipe(process.stdout);
