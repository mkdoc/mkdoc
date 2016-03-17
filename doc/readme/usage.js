var fs = require('fs')
  , doc = require('../../index')
  , pi = require('mkpi')
  , gen = require('mkgen')
  , out = require('mkout');

doc('doc/readme.md')
  .pipe(pi())
  .pipe(gen())
  .pipe(out())
  .pipe(fs.createWriteStream('README.md'));
