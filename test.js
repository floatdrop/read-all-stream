/* global it */

'use strict';
var assert = require('assert');
var read = require('./');
var Readable = require('stream').Readable;

it('should pass error to callback', function (done) {
	var stream = new Readable();
	stream._read = function () {
		setTimeout(stream.push.bind(stream), 20, null);
	};

	read(stream, function (err) {
		if (!err) {
			console.error('Error was not passed');
			assert(false);
			return;
		}

		assert(/bang/.test(err));
		done();
	});

	setTimeout(stream.emit.bind(stream, 'error', 'bang!'), 10);
});

it('should read data to Buffer', function (done) {
	var stream = new Readable();
	stream.push('woo ');
	stream.push('hoo\n');
	stream.push(null);

	read(stream, { encoding: null }, function (err, data) {
		assert(data instanceof Buffer);
		done();
	});
});

it('should read data to string', function (done) {
	var stream = new Readable();
	stream.push('woo ');
	stream.push('hoo\n');
	stream.push(null);

	read(stream, 'utf-8', function (err, data) {
		assert(/woo hoo/.test(data));
		done();
	});
});

it('should work with undefined encoding', function (done) {
	var stream = new Readable();
	stream.push('woo ');
	stream.push('hoo\n');
	stream.push(null);

	read(stream, undefined, function (err, data) {
		assert(/woo hoo/.test(data));
		done();
	});
});

it('should work with empty stream', function (done) {
	var stream = new Readable();
	stream.push(null);

	read(stream, null, function (err, data) {
		assert(data instanceof Buffer);
		done();
	});
});

it('should throw with invalid arguments', function () {
	assert.throws(function () {
		read();
	}, /stream argument is required/);

	assert.throws(function () {
		read(new Readable());
	}, /callback argument is required/);
});
