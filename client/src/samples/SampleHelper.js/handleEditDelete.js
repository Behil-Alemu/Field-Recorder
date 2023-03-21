import SamplesApi from '../../api/SamplesApi';

async function handleDeleteClick(id) {
	try {
		let result = await SamplesApi.deleteSample(id);

		return result.success;
	} catch (err) {
		return err;
	}
}

async function handleEditClick(id, data) {
	try {
		let result = await SamplesApi.editSamples(id, data);
		return result.success;
	} catch (err) {
		return err;
	}
}

export { handleDeleteClick, handleEditClick };
