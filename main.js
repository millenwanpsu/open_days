'use strict';

var express = require('express');
var socket = require('socket.io');
var assert = require('assert');

var server = express();

server.use('/', express.static(__dirname + '/'));
var io = socket(server.listen(8080));
io.on('connection', function(objectSocket) {

	objectSocket.on('disconnect', function() {
		console.log('client disconnected');
	});
});

