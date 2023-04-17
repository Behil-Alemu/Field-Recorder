import React, { useContext } from 'react';
//import FoldersApi from '../api/FoldersApi';
import UserContext from '../auth/UserContext';
import LoadingSpinner from '../helpers/LoadingSpinner';
import { Card, Text, CardBody, CardHeader, Heading, Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';

function ProjectList({ projects, setProjects }) {
	// const [ formErrors, setFormErrors ] = useState([]);
	const { currentUser } = useContext(UserContext);
	const bg = useColorModeValue('gray.100', 'gray.600');
	const cardBg = useColorModeValue('red.50', 'red.800');

	console.debug('ProjectList', 'currentUser=', currentUser, 'projects=', projects);

	if (!projects) {
		console.log('projects not hereee');
		return <LoadingSpinner />;
	}
	const updateProjects = (deletedProjectId) => {
		setProjects((prevProjects) => prevProjects.filter((project) => project.id !== deletedProjectId));
	};

	return (
		<div>
			{projects.length ? (
				<Box p={4} rounded="md" bg={bg}>
					<SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
						{projects.map((p) => (
							<ProjectCard
								key={p.id}
								id={p.id}
								folderName={p.foldername}
								updateProjects={updateProjects}
							/>
						))}
					</SimpleGrid>
				</Box>
			) : (
				<Card maxW="md" align="center" bg={cardBg}>
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
