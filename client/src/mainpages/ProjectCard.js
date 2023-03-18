import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import { handleDeleteClick } from './delete-edit/handleEditDelete.js';

function ProjectCard({ id, folderName }) {
	let history = useNavigate();

	console.debug('ProjectCard', 'id=', id, 'folderName=', folderName);
	const handleDelete = async () => {
		try {
			let result = await handleDeleteClick(id);
			console.log(result);
			history(`/homepage`);
			//why do i have to reload to get back to home
		} catch (err) {
			console.error(err);
		}
	};

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
				{/* <IconButton
					m="2"
					variant="outline"
					aria-label="Search database"
					icon={<EditIcon />}
					onClick={<handleEditClick />}
				/> */}
				<IconButton
					m="2"
					variant="outline"
					aria-label="Search database"
					icon={<DeleteIcon />}
					onClick={handleDelete}
				/>
			</CardFooter>
		</Card>
	);
}

export default ProjectCard;
