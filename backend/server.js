const express = require('express');

const apiRoute = require('./api')


const server = express();



server.use('/api', apiRoute)

module.exports = server;
