import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useColorModeValue,
	Divider,
	Flex
} from '@chakra-ui/react';
import PasswordField from '../helpers/PasswordField';
import { NotifyRed } from '../helpers/Alert';
import { Logo } from './Logo';
import useLocalStorage from '../hooks/useLocalStorage';
import GoogleAuth from './OAuthComponents/GoogleAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { generateUniqueUsername } from './OAuthComponents/generateUsername';

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /hompage route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login, loginGoogle, signupGoogle }) {
	const history = useNavigate();
	const [ formData, setFormData ] = useState({
		username: localStorage.username ? localStorage.username : '',
		password: localStorage.password ? localStorage.password : ''
	});
	const [ formErrors, setFormErrors ] = useState([]);

	console.debug('LoginForm', 'login=', typeof login, 'formData=', formData, 'formErrors', formErrors);

	/** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await login(formData);

		if (result.success) {
			history('/homepage');
		} else {
			setFormErrors(result.errors);
		}

		if (rememberMe) {
			window.localStorage.setItem('username', formData.username);
			window.localStorage.setItem('password', formData.password);
		} else {
			window.localStorage.removeItem('username');
			window.localStorage.removeItem('password');
		}
	}

	/** Update form data field */
	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleGoogleData(googleAuthData) {
		console.log(googleAuthData);

		// Extract relevant data from googleAuthData
		const { email } = googleAuthData;

		// Check if user exists in users table
		const user = await loginGoogle(email);
		
		console.log(user.success);

		if (user.success === false) {
			
			// User does not exist, add them to users table
			const { given_name, family_name } = googleAuthData;
			console.log("{{{{{{hu}}}}}}", given_name, family_name)
			// const username = await generateUniqueUsername(email);
			// console.log("{{{{{{hu}}}}}}", username)

			let user = await signupGoogle({username: given_name, firstName: given_name, lastName: family_name, email });

			console.log(user);
			if (user.success){
				history('/homepage');
			}else{
				console.log("user not added it")
			}
			
		} else {
			// User exists, log them in
			console.log(user);
			await loginGoogle(email)
			history('/homepage');
		}
	}

	const [ rememberMe, setRememberMe ] = useLocalStorage('rememberMe', false);
	const bg = useColorModeValue('white', 'gray.50', 'linear(to-r, green.50, green.200)');
	const color = useColorModeValue('green.800', 'green.800');

	return (
		<Container maxW="lg" py={{ base: '2', md: '2' }} px={{ base: '0', sm: '8' }}>
			<Stack bg={bg} color={color} spacing="4">
				<Stack spacing="2" alignItems="center" justifyContent="center">
					{/* <form onSubmit={handleSubmit}>{formErrors.length > 0 && <NotifyRed error={formErrors} />}</form> */}
					<Logo />
					<Stack spacing={{ base: '2', md: '3' }} text="ceAlignnter">
						<Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
						<HStack spacing="1" justify="center">
							<Text color="muted">Don't have an account?</Text>
							<Button as="a" href="/signup" variant="link" colorScheme="green">
								Sign up
							</Button>
						</HStack>
					</Stack>
				</Stack>
				<Box
					py={{ base: '0', sm: '8' }}
					px={{ base: '4', sm: '10' }}
					bg={{ base: 'transparent', sm: 'bg-surface' }}
					boxShadow={{ base: 'none', sm: 'md' }}
					borderRadius={{ base: 'none', sm: 'xl' }}
				>
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl>
								<FormLabel htmlFor="username">Username</FormLabel>
								<Input
									name="username"
									placeholder="Enter username"
									type="text"
									onChange={handleChange}
									value={localStorage.username ? localStorage.username : formData.username}
									required
								/>
								<FormLabel htmlFor="password">Password</FormLabel>
								<PasswordField
									handleChange={handleChange}
									passwordValue={localStorage.password ? localStorage.password : formData.password}
								/>
							</FormControl>
						</Stack>
						<HStack justify="space-between">
							<Checkbox
								colorScheme="green"
								isChecked={rememberMe}
								onChange={(event) => setRememberMe(event.target.checked)}
							>
								Remember me
							</Checkbox>
						</HStack>
						<Stack spacing="6">
							<Button colorScheme="green" size="sm" onClick={handleSubmit}>
								Sign in
							</Button>
							<Flex alignItems="center">
								<Divider mx={4} />
								<Text fontSize="sm" whiteSpace="nowrap" color="muted">
									or
								</Text>
								<Divider mx={4} />
							</Flex>
						</Stack>
						<GoogleOAuthProvider clientId="385613727062-55f7hm08nc1cpgqfodp7rc9ld27uf9lk.apps.googleusercontent.com">
							<GoogleAuth profileData={handleGoogleData} />
						</GoogleOAuthProvider>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}

export default LoginForm;
