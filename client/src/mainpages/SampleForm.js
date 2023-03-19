import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { FormControl, FormLabel, Input, Textarea, Button, Flex, Spacer,} from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';

function SampleForm() {
	const history = useNavigate();
	const { currentUser, token } = useContext(UserContext);
	const { id } = useParams();

	const [ formData, setFormData ] = useState({
		commonName: '',
		scientificName: '',
		quantity: 0,
		location: '',
		imageUrl: '',
		note: '',
		username: currentUser.username,
		folderId: Number(id)
	});
	const [ formErrors, setFormErrors ] = useState([]);
	console.debug('sampleForm', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit(evt) {
		evt.preventDefault();
		SamplesApi.token = token;
		let result = await SamplesApi.addSamples(formData);
        console.log(result,"HHHHHHHHHHHHHHHHHHHHHHH")
		if (result.success) {
			history.push('/homepage');
		} else {
			setFormErrors(result.errors);
		}
	}
	function handleChange(e) {
		const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	}

	return (
		<form onSubmit={handleSubmit}>
			<FormControl id="common-name" isRequired>
				<FormLabel>Common Name</FormLabel>
				<Input name="commonName" type="text" value={formData.commonName} onChange={handleChange} />
			</FormControl>

			<FormControl id="scientific-name" isRequired>
				<FormLabel>Scientific Name</FormLabel>
				<Input name="scientificName" type="text" value={formData.scientificName} onChange={handleChange} />
			</FormControl>

			<FormControl id="quantity">
				<FormLabel>Quantity</FormLabel>
				<Input name="quantity" type="number" value={Number(formData.quantity)} onChange={handleChange} />
			</FormControl>

			<FormControl id="location" isRequired>
				<FormLabel>Location</FormLabel>
				<Input name="location" type="text" value={formData.location} onChange={handleChange} />
			</FormControl>

			<FormControl id="image-url">
				<FormLabel>Image URL</FormLabel>
				<Input name="imageUrl" type="text" value={formData.imageUrl} onChange={handleChange} />
			</FormControl>

			<FormControl id="note">
				<FormLabel>Note</FormLabel>
				<Textarea name="note" value={formData.note} onChange={handleChange} />
			</FormControl>

			<Flex mt={4}>
				<Spacer />
				<Button colorScheme="green" type="submit">
					Submit
				</Button>
			</Flex>
		</form>
	);
}

export default SampleForm;
