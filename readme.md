# read-all-stream [![Build Status][travis-image]][travis-url]

> Read stream to buffer or string

## Install

```sh
$ npm install --save read-all-stream
```

## Usage

```js
var read = require('read-all-stream');
var stream = fs.createReadStream('index.js');

read(stream, 'utf-8', function (err, data, message) {
	console.log(message + data.length);
	//=> Hello, your data length: 42
}, 'Hello, your data length: ');

```

### API

#### read(stream, [options], [callback], [args...])

##### stream

*Required*  
Type: `Stream`

Event emitter, which `data` events will be consumed.

##### options

Type: `object` or `string`

If type of `options` is `string`, then it will be used as encoding.
If type is `Object`, then next options is available:

##### options.encoding

Type: `string`, `null`  
Default: `'utf8'`

Encoding to be used on `toString` of the data. If null, the body is returned as a Buffer.

##### callback(err, data, args...)

###### err

`Error` object (if `error` event happens).

###### data

The data in stream.

##### args...

These arguments will be passed to callback.

## License

MIT © [Vsevolod Strukchinsky](floatdrop@gmail.com)

[travis-url]: https://travis-ci.org/floatdrop/read-all-stream
[travis-image]: http://img.shields.io/travis/floatdrop/read-all-stream.svg?style=flat
