# Creating Tasks

Tasks are *named* functions that are passed to the `task` function:

```javascript
var mk = require('mktask');

// @task readme build the readme file.
function readme(cb) {
  // implement task logic
  cb();
}

mk.task(readme);
```

Anonymous functions are not allowed and will generate an error if used.

# Task Documentation

It is considered good practice to annotate your tasks with comments that provide a name and description of the task so that it will be included in the list printed when running `mk --tasks`.

```javascript
// @task readme build the readme file.
```

# Task Names

By default the task identifier (referenced on the command line) is taken from the function name but you may explicitly specify an identifier if you prefer:

```javascript
mk.task('docs', function readme(cb){cb()});
```

If you have dependencies the identifier comes afterwards:

```javascript
mk.task([api, example], 'docs', function readme(cb){cb()});
```

When multiple tasks are passed then the identifier is taken from the last function which in this case becomes `readme`:

```javascript
mk.task(function api(cb){cb()}, function readme(cb){cb()});
```

# Main Task

The `mk` program when executed with no arguments will either run all available tasks in series or a `main` task if declared. To declare a main task give it the name `main`:

```javascript
var mk = require('mktask');

// @task main build all documentation.
function main(cb) {
  // implement task logic
  cb();
}

mk.task(main);
```

# Deferred Tasks

Typically task functions will invoke the callback function when done but they may also return an array of task functions which is useful when a task wishes to defer to a series of other tasks:

```javascript
var mk = require('mktask');

// @task api build the api docs.
function api(cb) {
  // implement api task logic
  cb();
}

// @task readme build the readme file.
function readme(cb) {
  // implement readme task logic
  cb();
}

// @task main build the api and readme docs.
function main() {
  return [api, readme];
}

mk.task(api);
mk.task(readme);
mk.task(main);
```

Note that when deferring to other task functions they must have been registered by calling `task()`.

# Stream Tasks

Sometimes when creating complex stream pipelines it is useful to return streams so that parts of the pipeline become reusable between tasks, for example:

```javascript
var mk = require('mktask')
  , ast = require('mkast');

function in() {
  return mk
    .src('This is a markdown paragraph.')
    .pipe(ast.stringify());
}

function out() {
  return mk.dest('target/stream-example.md');
}

mk.task(in, out);
```

When a task returns a stream it is piped to the next task function in the pipeline and the callback function is added as a listener for the `finish` event on the last stream in the pipeline.

# Task Dependencies

Task functions may declare an array of functions to call before the task function(s).

Dependencies are executed in parallel but they must all complete before the tasks are executed:

```javascript
var mk = require('mktask');

// @task api build the api docs.
function api(
  // implement api task logic
  cb();
}

// @task example build the example file.
function example(
  // implement example task logic
  cb();
}

// @task readme build the readme file.
function readme(cb) {
  // implement readme task logic
  cb();
}

mk.task([api, example], readme);
```

# Task Arguments

Task functions are automatically exposed the parsed arguments object via `this.args`.

So running `mk readme --env devel` would result in the readme task being able to access the `env` option using `this.args.options.env`.

Flags are available in `this.args.flags` such that `mk readme -v` yields `true` for `this.args.flags.v`.

Note that some command line arguments are handled by the `mk` program see the help output with `mk -h`.

For detailed information on the `args` object see the [argparse library][argparse].

