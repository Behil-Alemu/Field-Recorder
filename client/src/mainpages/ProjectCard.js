import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Button,
	Text,
	IconButton,
	SearchIcon
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';


function ProjectCard({ id, folderName }) {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Project Name:{folderName}</Heading>
			</CardHeader>
			<CardBody>
				<Text>Project # {id}</Text>
				<Link to={`/homepage/${folderName}/${id}`}>
					<Button type="submit" size="sm">
						View samples
					</Button>
				</Link>
			</CardBody>
			<CardFooter>

				<IconButton  m="2"variant='outline' aria-label="Search database" icon={<EditIcon />} />
				<IconButton m="2" variant='outline' aria-label="Search database" icon={<DeleteIcon />} />
			</CardFooter>
		</Card>
	);
}

export default ProjectCard;

