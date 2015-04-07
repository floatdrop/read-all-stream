'use strict';

var concat = require('concat-stream');

module.exports = function read(stream, options, cb) {
	if (!stream) {
		throw new Error('stream argument is required');
	}

	if (typeof options === 'function') {
		cb = options;
		options = {};
	}

	if (typeof options === 'string' || options === undefined || options === null) {
		options = { encoding: options };
	}

	if (options.encoding === undefined) { options.encoding = 'utf8'; }

	if (!cb) {
		throw new Error('callback argument is required');
	}

	stream
		.once('error', cb)
		.pipe(concat({encoding: 'buffer'}, function (data) {
			if (options.encoding) {
				data = data.toString(options.encoding);
			}

			cb(null, data);
		}));
};
