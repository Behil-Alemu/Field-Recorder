import React, { useState } from 'react';
import { Box, Input } from '@chakra-ui/react';

const UploadImage = ({ onFileChange }) => {
	const [ file, setFile ] = useState('');

	const handleChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0].name
			setFile(file);
			onFileChange(file);
		}
	};

	return (
		<Box>
			<form enctype="multipart/form-data">
				<Input type="file" name="imageUrl" onChange={handleChange} />
			</form>
		</Box>
	);
};
export default UploadImage;
