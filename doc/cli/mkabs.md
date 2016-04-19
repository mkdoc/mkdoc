# Name

mkabs - make relative links absolute

# Synopsis

```
[flags] [options]
```

# Description

Converts relative links beginning with `/` to absolute URLs; when the --greedy option is given links beginning with `#` and `?` are also made absolute.

When no --base URL is given and a package.json file is available in the current working directory the base URL is extracted from the repository URL in package.json and the --relative path when not set assumes a github repository using the `/blob/master` path.

# Options

+ `-b, --base=[URL]` Base URL for absolute links
+ `-r, --relative=[PATH]` Relative path when repository url
+ `-g, --greedy` Convert links starting with # and ?
+ `-h, --help` Display help and exit
+ `--version` Print the version and exit

<? @include {=include} mkabs-example.md ?>
