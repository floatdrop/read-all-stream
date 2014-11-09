'use strict';

module.exports = function read(res, options, cb) {

	var _args = arguments;
	var argsLength = 3;

	if (typeof options === 'function') {
		cb = options;
		options = {};
		argsLength --;
	}

	if (typeof options === 'string') {
		options = { encoding: options };
	}

	if (options === undefined || options === null) {
		options = { encoding: options }
	}

	var chunks = [];
	var len = 0;
	var err = null;

	res.on('data', function (chunk) {
		chunks.push(chunk);
		len += chunk.length;
	});

	res.once('error', function (error) {
		err = error;
	});

	res.once('end', function () {
		var data = Buffer.concat(chunks, len);

		if (options.encoding !== null) {
			data = data.toString(options.encoding || 'utf-8');
		}

		var args = [err, data];

		for (var i = argsLength; i < _args.length; i++) {
			args.push(_args[i]);
		}

		cb.apply(null, args);
	});
};
