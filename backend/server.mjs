'use strict';
// require('dotenv').config();
import path from 'path';
import express from 'express';

import app from './app.mjs';
//port is listed as 3001 in config
import { PORT } from './config.js';
// listen at port 3001

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(new URL('../client/build', import.meta.url).pathname)));

app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
