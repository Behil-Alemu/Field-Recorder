import React, { useState } from 'react';
import { Box, Input } from '@chakra-ui/react';

const UploadImage = ({ onFileChange }) => {
	const [ file, setFile ] = useState('');

	const handleChange = (e) => {
		const data = e.target.files[0];
		setFile(data);
		onFileChange(URL.createObjectURL(data));
	};

	return (
		<Box>
			<Input type="file" onChange={handleChange} />
		</Box>
	);
};
export default UploadImage;
