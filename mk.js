var mk = require('mktask');

// @task readme build the api docs.
function api(cb) {
  console.dir('api called');
  cb();
}

// @task readme build the readme file.
function readme() {
  mk.doc('doc/readme.md')
    .pipe(this.pi())
    .pipe(this.msg())
    .pipe(this.ref())
    .pipe(this.abs())
    .pipe(this.out())
    .pipe(mk.dest('README.md'));
}

// @task readme build the readme file.
function main(cb) {
  console.dir('main called');
  cb();
}

mk.task(api);
mk.task(readme);
mk.task(main);
