import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import PasswordField from '../helpers/PasswordField';
import { NotifyRed } from '../helpers/Alert';
import { Logo } from './Logo';

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /hompage route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
	const history = useNavigate();
	const [ formData, setFormData ] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);

	console.debug('SignupForm', 'signup=', typeof signup, 'formData=', formData, 'formErrors', formErrors);

	/** Handle form submit:
   *
   * Calls signup func prop and, if successful, redirect to /homepage.
   */

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await signup(formData);
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
	const bg = useColorModeValue('white', 'gray.800');
	const color = useColorModeValue('gray.800', 'white');

	console.log(formErrors);
	return (
		<Container maxW="lg" py={{ base: '2', md: '2' }} px={{ base: '0', sm: '8' }}>
			<Stack bg={bg} color={color} spacing="4">
				<Stack spacing="2" alignItems="center" justifyContent="center">
					<form onSubmit={handleSubmit}>{formErrors.length > 0 && <NotifyRed error={formErrors} />}</form>
					<Logo />
					<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
						<Heading size={{ base: 'xs', md: 'sm' }}>Create an account</Heading>
						<Text color="muted">Already have an account?</Text>
						<Button as="a" href="/login" variant="link" colorScheme="green">
							Log in
						</Button>
					</Stack>
				</Stack>
				<Box
					py={{ base: '0', sm: '8' }}
					px={{ base: '4', sm: '10' }}
					bg={useColorModeValue('transparent', 'gray.700')}
					boxShadow={{ base: 'none', sm: 'md' }}
					borderRadius={{ base: 'none', sm: 'xl' }}
				>
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl>
								<FormLabel htmlFor="username">Username</FormLabel>
								<Input
									name="username"
									id="usernameId"
									placeholder="Enter username"
									type="text"
									onChange={handleChange}
									value={formData.username}
									required
								/>
								<FormLabel htmlFor="password">Password</FormLabel>
								<PasswordField handleChange={handleChange} passwordValue={formData.password} />
								<FormLabel htmlFor="firstName">First Name</FormLabel>
								<Input
									name="firstName"
									id="firstNameId"
									placeholder="Enter First Name"
									type="text"
									onChange={handleChange}
									value={formData.firstName}
									required
								/>
								<FormLabel htmlFor="firstName">Last Name</FormLabel>
								<Input
									name="lastName"
									id="lastNameId"
									placeholder="Enter Last Name"
									type="text"
									onChange={handleChange}
									value={formData.lastName}
									required
								/>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									name="email"
									id="emailId"
									placeholder="Enter Email"
									type="email"
									onChange={handleChange}
									value={formData.email}
									required
								/>
							</FormControl>
							<Stack spacing="6">
								<Button colorScheme="green" size="sm" onClick={handleSubmit}>
									Sign up
								</Button>
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}

export default SignupForm;
