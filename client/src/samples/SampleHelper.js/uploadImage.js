import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IKContext, IKUpload } from 'imagekitio-react';
import ImageApi from '../../api/ImageApi';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const urlEndpoint = 'https://ik.imagekit.io/kwjg3hkrf';
const authenticationEndpoint = 'http://localhost:3001/images/imgAuth';

const onError = (err) => {
	console.log('Error', err);
};

// const onSuccess = (res) => {
// 	console.log('Success', res.url);
// };

const UploadImage = ({ onFileChange }) => {
	const [ file, setFile ] = useState('');

	const handleChange = async (event) => {
		if (event.target.files && event.target.files[0]) {
			try {
				let response = await ImageApi.getAuth();

				const file = event.target.files[0];
				setFile(res.url);

				// const response = await fetch(authenticationEndpoint);

				// const { expire, signature } = await response.json();

				const formData = new FormData();
				formData.append('file', file);
				formData.append('fileName', file.name);
				formData.append('signature', response.signature);
				formData.append('apiKey', publicKey);
				formData.append('timestamp', response.expire);
				formData.append('folder', '/images');

				//const uploadResponse =
				 await fetch(urlEndpoint, {
					method: 'POST',
					body: formData,
					mode: 'no-cors'
				});

				// const uploadResult = await uploadResponse.json();

				// onFileChange(res.url);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const onSuccess = (res) => {
		// Call the onFileChange callback function with the res.url value
		onFileChange(res.url);
	  };

	return (
		<Box >
			<IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
				<IKUpload
					type="file"
					name="imageUrl"
					onChange={handleChange}
					onError={onError}
					onSuccess={onSuccess}
					isPrivateFile={false}
				/>
			</IKContext>
		</Box>
	);
};

export default UploadImage;
