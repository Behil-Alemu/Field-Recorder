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
	Editable,
	EditableInput,
	EditablePreview,
	Input,
	ButtonGroup,
	Flex,
	useEditableControls
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import { handleDeleteClick, handleEditClick } from './delete-edit/handleEditDelete.js';

function ProjectCard({ id, folderName, updateProjects }) {
	let history = useNavigate();

	console.debug('ProjectCard', 'id=', id, 'folderName=', folderName);
	const handleDelete = async () => {
		try {
			await handleDeleteClick(id);
			updateProjects(id);
			history('/homepage');

			return;
		} catch (err) {
			console.error(err);
		}
	};
	const handleEdit = async (id, newValue) => {
		let dataFormat = {
			folderName: newValue
		};

		try {
			let result = await handleEditClick(id, dataFormat);
			console.log(result);
			history('/homepage');
			return;
		} catch (err) {
			console.error(err);
		}
	};
	function EditableControls() {
		const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

		return isEditing ? (
			<ButtonGroup justifyContent="center" size="sm">
				<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
				<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : (
			<Flex justifyContent="center">
				<IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
			</Flex>
		);
	}

	return (
		<Card>
			<CardHeader>
				<Heading size="md">
					<Editable
						textAlign="center"
						defaultValue={folderName}
						fontSize="2xl"
						isPreviewFocusable={false}
						onSubmit={(value) => handleEdit(id, value)}
					>
						<EditablePreview />
						<Input as={EditableInput} />
						<EditableControls />
					</Editable>
				</Heading>
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
