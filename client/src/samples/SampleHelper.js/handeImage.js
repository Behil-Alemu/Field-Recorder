import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
// ...
const HandleImage = () => {
	const { imageurl } = useParams();
	console.log(imageurl, "{{{{{HI}}}}}");
	return (
		<Box>
			<Text>{imageurl}</Text>
			<Image src={imageurl} />
			<Image src="https://bit.ly/fcc-relaxing-cat" alt="" />
		</Box>
	);
};
export default HandleImage;
