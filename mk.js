var mk = require('mktask');

function readme(cb) {
  console.dir('readme called');
  cb();
}

function main(cb) {
  console.dir('main called');
  cb();
}

mk.task(readme);
mk.task(main);
