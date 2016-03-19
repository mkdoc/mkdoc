var mk = require('mktask');

function api(cb) {
  console.dir('api called');
  cb();
}


function readme() {
  mk.doc('doc/readme.md')
    .pipe(this.pi())
    .pipe(this.msg())
    .pipe(this.ref())
    .pipe(this.out())
    .pipe(mk.dest('README.md.log'));
}

function main(cb) {
  console.dir('main called');
  cb();
}

mk.task(api);
mk.task(readme);
mk.task(main);
