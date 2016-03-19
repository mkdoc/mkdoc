var mk = require('mktask');

function api(cb) {
  console.dir('api called');
  cb();
}


function readme(cb) {
  console.dir('readme called');
  cb();
}

function main(cb) {
  console.dir('main called');
  cb();
}

mk.task(api);
mk.task(readme);
mk.task(main);
