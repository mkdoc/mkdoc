var mk = require('mktask');

// @task readme build the api docs.
function api(cb) {
  //console.dir('api called');
  //console.dir(this.args);
  cb();
}

// @task readme build the readme file.
function readme() {
  mk.doc('doc/readme.md')
    .pipe(mk.pi())
    .pipe(mk.msg())
    .pipe(mk.ref())
    .pipe(mk.abs())
    .pipe(mk.out())
    .pipe(mk.dest('README.md'));
}

mk.task(api);
mk.task(readme);
