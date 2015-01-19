'use strict';

module.exports = function read(res, options, cb) {
	if (typeof options === 'function') {
		cb = options;
		options = {};
	}

	if (typeof options === 'string' || options === undefined || options === null) {
		options = { encoding: options };
	}

	var chunks = [];
	var len = 0;
	var err = null;

	res.on('readable', function () {
		var chunk;
		while (chunk = res.read()) {
			chunks.push(chunk);
			len += chunk.length;
		}
	});

	res.once('error', function (error) {
		err = error;
	});

	res.once('end', function () {
		var data = Buffer.concat(chunks, len);

		if (options.encoding !== null) {
			data = data.toString(options.encoding || 'utf-8');
		}

		cb(err, data);
	});
};
