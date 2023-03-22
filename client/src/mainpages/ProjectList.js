import React, { useEffect, useState, useContext } from 'react';
import FoldersApi from '../api/FoldersApi';
import UserContext from '../auth/UserContext';
import LoadingSpinner from '../helpers/LoadingSpinner';
import { Card, Text, CardBody, CardHeader, Heading, Box, SimpleGrid } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';


function ProjectList({username}) {
	const [ formErrors, setFormErrors ] = useState([]);
	const { currentUser, token } = useContext(UserContext);
	const [ projects, setProjects ] = useState([]);

	console.debug('ProjectList', 'currentUser=', currentUser, 'projects=', projects, 'formErrors', formErrors);

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
			setFormErrors(err);
		}
	}

	if (!projects) {
		console.log('projects not hereee');
		return <LoadingSpinner />;
	}

	return (
		<div>
			{projects.length ? (
				<Box p={4} bg="gray.50">
					<SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
						{projects.map((p) => <ProjectCard key={p.id} id={p.id} folderName={p.foldername} username={username} />)}
					</SimpleGrid>
				</Box>
			) : (
				<Card maxW="md" align="center" bg="red.50">
					<CardHeader>
						<Heading size="md">Sorry, no projects yet!</Heading>
					</CardHeader>
					<CardBody>
						<Text>Use above form :|</Text>
					</CardBody>
				</Card>
			)}
		</div>
	);
}

export default ProjectList;
