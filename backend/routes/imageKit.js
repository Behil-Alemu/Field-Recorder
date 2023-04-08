/* 
  This is our backend server.
  Replace YOUR_IMAGEKIT_URL_ENDPOINT, YOUR_IMAGEKIT_PUBLIC_KEY, 
  and YOUR_IMAGEKIT_PRIVATE_KEY with actual values
*/
const express = require('express');
const app = express();
const ImageKit = require('imagekit');
const router = express.Router();
const axios = require('axios');

//server for ImageKit backend authentication
const imagekit = new ImageKit({
	publicKey: 'public_p8VaPHs7pS8AtsSZr/cs3QquWc8=',
	privateKey: 'private_abPVKveUDzdPFpKpaVw6n6YFPA8=',
	urlEndpoint: 'https://ik.imagekit.io/kwjg3hkrf'
});

console.log(process.env.IMAGEKIT_PUBLIC_KEY, process.env.IMAGEKIT_PRIVATE_KEY);
// allow cross-origin requests
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.get('/imgAuth', function(req, res) {
	let result = imagekit.getAuthenticationParameters();
	res.send(result);
});

// const uploadResponse = await ImageApi.sendImage(formData);
// const urlEndpoint = 'https://ik.imagekit.io/kwjg3hkrf';

// router.post('/add', async function(req, res) {
// 	const formData = req.body;
// 	const uploadResponse = await post(urlEndpoint, formData);

// 	const uploadResult = await uploadResponse.json();
// 	res.json(uploadResult);
// });

module.exports = router;
