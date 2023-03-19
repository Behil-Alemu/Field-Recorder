import FoldersApi from '../../api/FoldersApi';

async function handleDeleteClick(id) {
	try {
		let result = await FoldersApi.deleteFolder(id);

		return result.success;
	} catch (err) {
		return err;
	}
}

async function handleEditClick(id, data) {
	try {
		let result = await FoldersApi.editFolder(id, data);
		return result.success;
	} catch (err) {
		return err;
	}
}

export { handleDeleteClick, handleEditClick };
