import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { FormControl, FormLabel, Input, Textarea, Button, Flex, Spacer } from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';
import NatureServerApi from '../api/natureServer';
import { DropdownIndicator } from './SampleHelper.js/DropdownIndicator';
import MapWrapper from '../samples/Maps/MapWrapper';


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
	const [ organisms, setOrganisms ] = useState([]);
	const [ organismToSearch, setOrganismToSearch ] = useState('');

	console.debug('sampleForm', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit() {
		SamplesApi.token = token;
		let result = await SamplesApi.addSamples(formData);
		if (result.success) {
			//question 3 I would have to reload to see the sample adeed
			history.push('/homepage');
		} else {
			setFormErrors(result.errors);
		}
	}
	// function handleChange(e) {
	// 	const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;

	// 	setFormData({ ...formData, [e.target.name]: value });
	// }

	function handleChange(e) {
		if (e && e.value) {
			// // Handle change from Select component
			//setFormData({ ...formData, commonName: e.value });

			// Find selected option object
			const selectedOption = organismsInfo.find((option) => option.value === e.value);
			if (selectedOption) {
				// Update scientificName field with selected option's scientificName
				setFormData({
					...formData,
					commonName: selectedOption.value,
					scientificName: selectedOption.scientificName
				});
			}
		} else {
			// Handle change from Input component
			const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
			setFormData({ ...formData, [e.target.name]: value });
		}
	}
	function handleInputChange(inputValue) {
		setOrganismToSearch(inputValue);
	}

	useEffect(
		function getSamplessOnMount() {
			console.debug('SampleList useEffect getSamplesOnMount');
			organismsList();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ organismToSearch ]
	);

	async function organismsList() {
		try {
			const organismsInfo = await NatureServerApi.getTaxonData(organismToSearch);
			setOrganisms(organismsInfo);
		} catch (err) {
			console.log(err);
			setFormErrors(err);
		}
	}

	const organismsInfo = organisms.map((organism) => ({
		value: organism.primaryCommonName,
		label: organism.primaryCommonName,
		id: organism.uniqueId,
		scientificName: organism.scientificName
	}));

	return (
		<>
		<form onSubmit={handleSubmit}>
			<Flex>
				<FormControl p="1" id="common-name" isRequired>
					<FormLabel>Common Name</FormLabel>
					<Select
						options={organismsInfo}
						value={formData.commonName}
						onInputChange={handleInputChange}
						onChange={handleChange}
						components={{ DropdownIndicator }}
						placeholder={formData.commonName}
					/>

					{/* <Input name="commonName" type="text" value={formData.commonName} onChange={handleChange} /> */}
				</FormControl>

				<FormControl p="1" id="scientific-name" isRequired>
					<FormLabel>Scientific Name</FormLabel>
					<Input name="scientificName" type="text" value={formData.scientificName} onChange={handleChange} />
				</FormControl>
			</Flex>
			<Flex>
				<FormControl p="1" id="quantity">
					<FormLabel>Quantity</FormLabel>
					<Input name="quantity" type="number" value={Number(formData.quantity)} onChange={handleChange} />
				</FormControl>

				<FormControl p="1" id="location" isRequired>
					<FormLabel>Location</FormLabel>
					<Input name="location" type="text" value={formData.location} onChange={handleChange} />
				</FormControl>
			</Flex>
			<Flex>
				<FormControl p="1" id="image-url">
					<FormLabel>Image URL</FormLabel>
					<Input name="imageUrl" type="text" value={formData.imageUrl} onChange={handleChange} />
				</FormControl>

				<FormControl p="1" id="note">
					<FormLabel>Note</FormLabel>
					<Textarea name="note" value={formData.note} onChange={handleChange} />
				</FormControl>
			</Flex>
			<Flex mt={4}>
				<Spacer />
				<Button colorScheme="green" type="submit">
					Submit
				</Button>
			</Flex>
			
		</form>
		<MapWrapper/>
		</>
	);
}

export default SampleForm;
