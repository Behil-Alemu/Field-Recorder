import React from 'react';
import { Spinner } from '@chakra-ui/react';

function LoadingSpinner() {
	return <Spinner  m={1} thickness="2px" speed="0.85s" emptyColor="gray.200" color="green.500" size="md" />;
}

export default LoadingSpinner;
