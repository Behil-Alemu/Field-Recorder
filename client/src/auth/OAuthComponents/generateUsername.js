import GoogleUserApi from '../../api/GoogleUserApi';

async function generateUniqueUsername(email) {
	// Use the part of the email address before the @ symbol as the base for the username
	let username = email.split("@")[0];
  
	// Check if username already exists in users table
	let user = await GoogleUserApi.getByUsername(username);
  
	if (user === null) {
	  return username;
	}

	console.log
  
	// If username already exists, append a number to it and check again
	let i = 1;
	if (user !== null) {
	  username = `${email.split("@")[0]}${i}`;
	  user = await GoogleUserApi.getByUsername(username);
	  i++;
	}
  
	return username;
  }
  

export { generateUniqueUsername };
