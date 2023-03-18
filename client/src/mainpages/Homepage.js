import React, { useContext, useState, useEffect } from 'react';
import FoldersApi from '../api/FoldersApi';
import UserContext from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import ProjectList from './ProjectList';

function Homepage() {
	const history = useNavigate();
	const { currentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		folderName: '',
		username: currentUser.username
	});
	const [ formErrors, setFormErrors ] = useState([]);

	console.debug('Homepage', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await FoldersApi.addFolder(formData);

		if (result.success) {
			history.push('/homepage');
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
					{currentUser.username}'s projects
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
				<ProjectList />
			</Box>
		</Box>
	);
}

export default Homepage;
