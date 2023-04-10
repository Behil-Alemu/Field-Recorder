'use strict';
// require('dotenv').config();
const path = require('path');
const express = require('express');

const app = require('./app');

// import app from './app.js';
//port is listed as 3001 in config
const { PORT } = require('./config');
// listen at port 3001

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
