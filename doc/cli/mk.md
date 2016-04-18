# Name

mk - task runner

# Synopsis

```
[options] [task...]
```

```zsh-locals
typeset -a tasks;
tasks=($(mk --tasks | cut -f 1-1 -d ' '));
```

```zsh
*:tasks:_values 'tasks' $tasks
```

# Description

Runs tasks defined in a task file. Searches for `mkdoc.js` in the current directory (or parent directories) and executes the specified tasks.

# Options

+ `-f, --file=[FILE...]` Load specific task files
+ `--tasks` Print task list
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

# Environment

If TASK_FILE is set it changes the name of the file searched for, default is `mkdoc.js`.

<? @include {=include} mktask-guide.md mktask-example.md ?>
