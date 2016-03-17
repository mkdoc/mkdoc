var fs = require('fs')
  , mkdoc = require('../index')
  , mkpi = require('mkpi')
  , mkgen = require('mkgen')
  , mkout = require('mkout');

mkdoc('doc/readme.md')
  .pipe(mkpi())
  .pipe(mkgen())
  .pipe(mkout())
  .pipe(fs.createWriteStream('README.md'));
