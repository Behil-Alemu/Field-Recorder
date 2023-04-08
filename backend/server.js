'use strict';
// require('dotenv').config();

import app from './app';
//port is listed as 3001 in config
import { PORT } from './config';
// listen at port 3001
app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
