'use strict';
// require('dotenv').config();

const app = require('./app').default;
//port is listed as 3001 in config
const { PORT } = require('./config');
// listen at port 3001
app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
