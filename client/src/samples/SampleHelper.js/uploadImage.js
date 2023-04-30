import React, { useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { IKContext, IKUpload } from 'imagekitio-react';
import ImageApi from '../../api/ImageApi';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const urlEndpoint = 'https://ik.imagekit.io/kwjg3hkrf';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const authenticationEndpoint = `${BASE_URL}/images/imgAuth`;

const onError = (err) => {
	console.log('Error', err);
};

const UploadImage = ({ onFileChange }) => {
	const [ file, setFile ] = useState('');
	const bg = useColorModeValue('gray.100', 'gray.600');
	const color = useColorModeValue('teal.800', 'teal.200');

	const handleChange = async (event) => {
		if (event.target.files && event.target.files[0]) {
			try {
				let response = await ImageApi.getAuth();

				const file = event.target.files[0];
				setFile(res.url);
				console.log(file);

				const formData = new FormData();
				formData.append('file', file);
				formData.append('fileName', file.name);
				formData.append('signature', response.signature);
				formData.append('apiKey', publicKey);
				formData.append('timestamp', response.expire);
				formData.append('folder', '/images');

				console.log(formData)
				
				await fetch(urlEndpoint, {
					method: 'POST',
					body: formData,
					mode: 'no-cors'
				});
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
		<Box borderRadius="md" alignItems="left" p={6} bg={bg} color={color} shadow="md">
			<IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
				<IKUpload
					className="my-upload-button"
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
