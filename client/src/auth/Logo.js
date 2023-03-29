import { Box, Image } from '@chakra-ui/react';
import logo from '../images/logo.png';

export const Logo = (props) => (
	<Box
		display="flex"
		alignItems="center"
		justifyContent="center"
		w="150px"
		h="150px"
		
		rounded="full"
		boxShadow="md"
		{...props}
	>
		<Image src={logo} alt="Logo" maxW="80%" maxH="80%" />
	</Box>
);
