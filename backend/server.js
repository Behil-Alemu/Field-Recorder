'use strict';
require('dotenv').config();

import { listen } from './app';
//port is listed as 3001 in config
import { PORT } from './config';
// listen at port 3001
listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
