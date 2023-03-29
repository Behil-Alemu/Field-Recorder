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
	Divider
} from '@chakra-ui/react';
import PasswordField from '../helpers/PasswordField';
import { NotifyRed } from '../helpers/Alert';
import { OAuthButtonGroup } from './OAuthComponents/OAuthButtons';
import { Logo } from './Logo';

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

function LoginForm({ login }) {
	const history = useNavigate();
	const [ formData, setFormData ] = useState({
		username: '',
		password: ''
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
	}

	/** Update form data field */
	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<Container maxW="lg" py={{ base: '2', md: '2' }} px={{ base: '0', sm: '8' }}>
			<Stack spacing="4">
				<Stack spacing="2" alignItems="center" justifyContent="center">
					<form onSubmit={handleSubmit}>{formErrors.length > 0 && <NotifyRed error={formErrors} />}</form>
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
									value={formData.username}
									required
								/>
								<FormLabel htmlFor="password">Password</FormLabel>
								<PasswordField handleChange={handleChange} passwordValue={formData.password} />
							</FormControl>
						</Stack>
						<HStack justify="space-between">
							<Checkbox defaultChecked colorScheme="green">
								Remember me
							</Checkbox>
						</HStack>
						<Stack spacing="6">
							<Button colorScheme="green" size="sm" onClick={handleSubmit}>
								Sign in
							</Button>
							<Divider color="green.100" />
							<Text fontSize="sm" whiteSpace="nowrap" color="muted">
								or continue with
							</Text>
							<Divider />
						</Stack>
						<OAuthButtonGroup />
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}

export default LoginForm;
