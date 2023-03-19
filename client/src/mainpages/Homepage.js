import React, { useContext, useState } from 'react';
import FoldersApi from '../api/FoldersApi';
import UserContext from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import ProjectList from './ProjectList';

function Homepage() {
	const history = useNavigate();
	const { currentUser, token } = useContext(UserContext);
	let username = currentUser == null ? '' : currentUser.username;
	const [ formData, setFormData ] = useState({
		folderName: '',
		//when i first load it, it says username not found
		username: username
	});
	const [ formErrors, setFormErrors ] = useState([]);

	console.debug('Homepage', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit() {
		//why wont it work when event handlers added
		FoldersApi.token = token;
		let result = await FoldersApi.addFolder(formData, currentUser.username);

		if (result.success) {
			history('/homepage');
		} else {
			setFormErrors(result.errors);
		}
	}
	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<Box>
			<Box p={4}>
				<Heading as="h1" size="lg" mb={4}>
					{username}'s projects
				</Heading>
				<Box borderWidth="1px" p={4} borderRadius="md">
					<form onSubmit={handleSubmit}>
						<FormControl isInvalid={formErrors.length > 0}>
							<FormLabel htmlFor="folderName">Folder Name</FormLabel>
							<Input
								type="text"
								id="folderName"
								name="folderName"
								value={formData.folderName}
								onChange={handleChange}
								placeholder="Enter project name"
							/>
							<FormErrorMessage>{formErrors.join(',')}</FormErrorMessage>
						</FormControl>
						<Button mt={4} colorScheme="blue" type="submit">
							Add Folder
						</Button>
					</form>
				</Box>
			</Box>
			<Box align="center">
				<ProjectList username={username} />
			</Box>
		</Box>
	);
}

export default Homepage;
