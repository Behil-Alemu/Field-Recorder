'use strict';
// require('dotenv').config();

import app from './app.mjs';
//port is listed as 3001 in config
import { PORT } from './config.js';
// listen at port 3001
app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
