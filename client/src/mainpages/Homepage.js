import React, { useContext, useState, useEffect } from 'react';
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
	const [ projects, setProjects ] = useState([]);

	console.debug('Homepage', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	useEffect(function getProjectsOnMount() {
		console.debug('ProjectList useEffect getProjectsOnMount');
		projectList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function projectList() {
		try {
			FoldersApi.token = token;
			let result = await FoldersApi.getFolder(username);
			setProjects(result);
		} catch (err) {
			console.log(err);
			setFormErrors(err.message);
		}
	}

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (!formData.folderName) {
			setFormErrors('Folder name is required');
			return;
		}

		try {
			FoldersApi.token = token;
			let result = await FoldersApi.addFolder(formData, currentUser.username);
			if (result) {
				let res = await FoldersApi.getFolder(username);
				setProjects(res);
				setTimeout(() => {
					history('/homepage');
				}, 500);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setFormErrors([ error.message ]);
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
								isRequired
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
				<ProjectList projects={projects} setProjects={setProjects} />
			</Box>
		</Box>
	);
}

export default Homepage;
