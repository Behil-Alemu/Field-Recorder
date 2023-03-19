import React, { useState, useContext } from 'react';
import UsersApi from '../api/UsersApi';
import UserContext from '../auth/UserContext';
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	Heading,
	useToast
} from '@chakra-ui/react';

function ProfileForm() {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		username: currentUser.username,
		password: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);

	const toast = useToast();

	async function handleSubmit(evt) {
		evt.preventDefault();

		let profileData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password
		};

		let username = formData.username;
		let updatedUser;

		try {
			updatedUser = await UsersApi.editProfile(username, profileData);
			toast({
				title: 'Profile updated',
				description: 'Your profile information has been updated.',
				status: 'success',
				duration: 5000,
				isClosable: true
			});
		} catch (errors) {
			setFormErrors(errors);
			return;
		}

		setFormData((f) => ({ ...f, password: '' }));
		setFormErrors([]);
		setSaveConfirmed(true);

		setCurrentUser(updatedUser);
	}

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((f) => ({
			...f,
			[name]: value
		}));
		setFormErrors([]);
	}

	return (
		<Box maxW="sm" align="center" borderWidth="1px" rounded="lg" p="4">
			<Heading>{formData.username} </Heading>
			<FormControl>
				<FormLabel htmlFor="firstName">First Name</FormLabel>
				<Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
			</FormControl>
			<FormControl>
				<FormLabel htmlFor="lastName">Last Name</FormLabel>
				<Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
			</FormControl>
			<FormControl>
				<FormLabel htmlFor="email">Email</FormLabel>
				<Input type="email" name="email" value={formData.email} onChange={handleChange} />
			</FormControl>
			<FormControl>
				<FormLabel htmlFor="password">Confirm password to make changes:</FormLabel>
				<Input type="password" name="password" value={formData.password} onChange={handleChange} />
			</FormControl>
			{formErrors.length ? (
				<Box color="red.500" mb="4">
					{formErrors.map((error) => <div key={error}>{error}</div>)}
				</Box>
			) : null}
			{saveConfirmed ? (
				<Box color="green.500" mb="4">
					Success!
				</Box>
			) : null}
			<Button colorScheme="blue" onClick={handleSubmit}>
				Save Changes
			</Button>{' '}
		</Box>
	);
}
export default ProfileForm;
