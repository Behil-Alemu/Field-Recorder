import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { FormControl, FormLabel, Input, Textarea, Button, Flex, Spacer, Icon, Text, Stack } from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';
import NatureServerApi from '../api/natureServer';
import { DropdownIndicator } from './SampleHelper.js/DropdownIndicator';
import { getCoords } from '../samples/Maps/getCoords';
import { GrLocation } from 'react-icons/gr';
import LoadingSpinner from '../helpers/LoadingSpinner';
import UploadImage from './SampleHelper.js/uploadImage';
import customStyles from './SampleHelper.js/reactSelectStyle';

function SampleForm({ sampleList }) {
	const history = useNavigate();

	const { currentUser, token } = useContext(UserContext);
	const { folderName, id } = useParams();

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
	const [ coords, setCoords ] = useState({ lat: null, lng: null });
	const [ isLoading, setIsLoading ] = useState(false);

	console.debug('sampleForm', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit(evt) {
		evt.preventDefault();
		SamplesApi.token = token;
		try {
			let result = await SamplesApi.addSamples(formData);

			console.log(result.success, '{{{{{{{{result}}}}}}}}');

			if (result) {
				await sampleList();
				setTimeout(() => {
					history(`/homepage/${folderName}/${id}`);
				}, 500);
			} else {
				setFormErrors(result.errors);
			}
		} catch (error) {
			// handle the error
			console.error(error);
		}
	}

	const handleGetCoords = async () => {
		setIsLoading(true);
		try {
			const { lat, lng } = await getCoords();
			formData.location = { lat, lng };
			setCoords({ lat, lng });
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};
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
	const handleFileChange = (file) => {
		const updatedFormData = {
			...formData,
			imageUrl: file
		};
		setFormData(updatedFormData);
	};
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
		<form onSubmit={handleSubmit}>
			<Flex>
				<FormControl p="1" id="common-name" isRequired>
					<FormLabel>Common Name</FormLabel>
					<Select
						styles={customStyles}
						options={organismsInfo}
						value={formData.commonName}
						onInputChange={handleInputChange}
						onChange={handleChange}
						components={{ DropdownIndicator }}
						placeholder={formData.commonName}
					/>
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
				<FormControl align="left">
					<FormLabel>Location</FormLabel>
					<Stack>
						<Button align="left" onClick={handleGetCoords}>
							Pin Current Location <Icon as={GrLocation} />
						</Button>
						{isLoading ? (
							<LoadingSpinner />
						) : coords.lat ? (
							<Text>{`Lat:${coords.lat} Lng:${coords.lng}`}</Text>
						) : null}
					</Stack>
				</FormControl>
			</Flex>

			<Flex>
				<FormControl p="1" id="note">
					<FormLabel>Note</FormLabel>
					<Textarea name="note" value={formData.note} onChange={handleChange} />
				</FormControl>

				<FormControl p="1" id="image">
					<FormLabel>Image</FormLabel>
					<UploadImage onFileChange={handleFileChange} />
				</FormControl>
			</Flex>

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
