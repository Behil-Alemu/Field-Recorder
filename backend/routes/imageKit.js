
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



module.exports = router;
