import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Image, Heading, Stack, Text } from '@chakra-ui/react';
import UserContext from '../auth/UserContext';

export default function Hero({ title, subtitle, image, signupLink, createText, ...rest }) {
	const { currentUser } = useContext(UserContext);
	const NatureServeUrl = 'https://explorer.natureserve.org/';
	return (
		<Flex
			align="center"
			justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
			direction={{ base: 'column-reverse', md: 'row' }}
			wrap="no-wrap"
			minH="70vh"
			px={8}
			mb={16}
			{...rest}
		>
			<Stack
				spacing={4}
				w={{ base: '80%', md: '40%' }}
				align={[ 'center', 'center', 'flex-start', 'flex-start' ]}
			>
				<Heading
					as="h1"
					size="xl"
					fontWeight="bold"
					color="primary.800"
					textAlign={[ 'center', 'center', 'left', 'left' ]}
				>
					{title}
				</Heading>
				<Heading
					as="h2"
					size="md"
					color="primary.800"
					opacity="0.8"
					fontWeight="normal"
					lineHeight={1.5}
					textAlign={[ 'center', 'center', 'left', 'left' ]}
				>
					{subtitle}
				</Heading>
				{currentUser ? (
					<Link to={NatureServeUrl}>
						<Button colorScheme="green" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
							Visit NatureServe Explorer!
						</Button>
					</Link>
				) : (
					<Link to={signupLink}>
						<Button colorScheme="green" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
							{createText}
						</Button>
					</Link>
				)}
				<Text fontSize="xs" mt={2} textAlign="center" color="primary.800" opacity="0.6">
					Not sure what put here.
				</Text>
			</Stack>
			<Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
				<Image src={image} size="100%" rounded="1rem" shadow="2xl" />
			</Box>
		</Flex>
	);
}

Hero.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	createText: PropTypes.string,
	signupLink: PropTypes.string
};

Hero.defaultProps = {
	title: 'FieldRecorder',
	subtitle:
		'For research biologist-data entry and analysis app. Keep track of samples and pin the location of samples found. Accompanied by NatureServe Explorer REST API, an API that has information on rare and endangered species and ecosystems in the Americas.',
	image: 'https://source.unsplash.com/collection/1360066/800x600',
	createText: 'Create your account now',
	signupLink: '/signup'
};
