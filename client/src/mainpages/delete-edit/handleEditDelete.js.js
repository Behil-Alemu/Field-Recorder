import FoldersApi from '../../api/FoldersApi';

async function handleDeleteClick(id) {
	try {
		let result = await FoldersApi.deleteFolder(id);

		return result.success
	} catch (err) {
		return err;
	}
}

// async function handleEditClick() {

// 	return (
// 		<Box p={4}>
// 			<Heading  as="h1" size="lg" mb={4}>
// 				EditIcon
// 			</Heading>
// 		</Box>
// 	);
// }

export { handleDeleteClick };
