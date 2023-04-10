'use strict';
/** Database setup for sample collection. 
 *  set up a PostgreSQL database connection using the 
 * SSL/TLS (Secure Sockets Layer/Transport Layer Security) is a protocol used to establish a secure encrypted connection between a client (e.g., a web browser) and a server (e.g., a web server)
*/
const { Client } = require('pg');
const { getDatabaseUri } = require('./config.cjs');

let db;
//if production return the production database URL else development
if (process.env.NODE_ENV === 'production') {
	db = new Client({
		//Client object requires a connectionString parameter, specifies the database URL to connect to
		connectionString: getDatabaseUri(),
		ssl: {
			//allow connections to SSL/TLS
			rejectUnauthorized: false
		}
	});
} else {
	db = new Client({
		connectionString: getDatabaseUri()
	});
}

db.connect();

module.exports = db;
