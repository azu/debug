# @deps/debug [![Build Status](https://travis-ci.org/azu/debug.svg?branch=master)](https://travis-ci.org/azu/debug)

Simple debug logger for Browser/Node.js.

## Features

- Provide a single `debug` function
- Support TypeScript
- Support ES modules `import`
- Support Browser and Node.js

This library is inspired by [visionmedia/debug](https://github.com/visionmedia/debug).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @deps/debug

## Usage

### API

This library provide `debug` that is a function.

This `debug` function output to console if **DEBUG MODE** is enabled.

```ts
import { debug } from "@deps/debug";

debug("log text"):
// => Output to console: "log text"
```

## Enable **DEBUG MODE**

`debug` accept following values as DEBUG.

- `*`: Enable all debug log
- `prefix:*` Enable debug log that start with `prefix:`
- `-prefix:*` Disable debug log that start with `prefix:`

Also, `debug` accept Multiple values as DEBUG.
The values should be separated by `,`.

`a,b,c`

### Node.js

Enable **DEBUG MODE** by Environment Variables.

```sh
DEBUG=*
DEBUG=prefix:*
DEBUG=-prefix:*
DEBUG=-p1,p2,p3
```

### Browser

Enable **DEBUG MODE** by `localStorage` API.

```js
localStorage.debug = '*';
localStorage.debug = 'prefix:*'
localStorage.debug = '-prefix:*'
localStorage.debug = 'p1,p2,p3'
```

## Force disable logging

`DEBUG_CONTROLLER` is shared value of the `debug` module.

```ts
import { DEBUG_CONTROLLER } from "@deps/debug"
// Stop logging
DEBUG_CONTROLLER.disable();
// Start logging(by default)
DEBUG_CONTROLLER.enable();
```

## Changelog

See [Releases page](https://github.com/azu/debug/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/debug/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

Some codes are copied from following:

- [visionmedia/debug](https://github.com/visionmedia/debug)
    - Copyright (c) 2014-2017 TJ Holowaychuk <tj@vision-media.ca>
