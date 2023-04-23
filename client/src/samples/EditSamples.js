import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import {
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Button,
	Flex,
	Spacer,
	Icon,
	Stack,
	Heading,
	Text,
	useColorMode
} from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';
import NatureServerApi from '../api/natureServer';
import { DropdownIndicator } from './SampleHelper.js/DropdownIndicator';
import { getCoords } from '../samples/Maps/getCoords';
import { GrLocation } from 'react-icons/gr';
import UploadImage from './SampleHelper.js/uploadImage';
import LoadingSpinner from '../helpers/LoadingSpinner';
function EditSamples() {
	const history = useNavigate();
	const [ formErrors, setFormErrors ] = useState([]);
	const [ organisms, setOrganisms ] = useState([]);
	const [ organismToSearch, setOrganismToSearch ] = useState('');
	const [ coords, setCoords ] = useState({ lat: null, long: null });
	const { token } = useContext(UserContext);
	const { sample_id, folderName } = useParams();
	const [ sample, setSample ] = useState({});
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(function getSamplessOnMount() {
		console.debug('SampleList useEffect getSamplesOnMount');
		sampleList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [ formData, setFormData ] = useState({});

	async function sampleList() {
		try {
			SamplesApi.token = token;
			let result = await SamplesApi.getSampleById(sample_id);
			setSample(result);
			setFormData({
				commonName: result.common_name,
				scientificName: result.scientific_name,
				quantity: result.quantity,
				location: result.location,
				imageUrl: result.image_url,
				note: result.note
			});
		} catch (err) {
			console.log(err);
			setFormErrors(err);
		}
	}

	async function handleSubmit(evt) {
		evt.preventDefault();
		let editData = {
			commonName: formData.commonName,
			scientificName: formData.scientificName,
			quantity: formData.quantity,
			location: formData.location,
			imageUrl: formData.imageUrl,
			note: formData.note
		};

		SamplesApi.token = token;
		let result = await SamplesApi.editSamples(sample_id, editData);

		if (result) {
			history(`/homepage/${folderName}/${sample_id}`);
		} else {
			setFormErrors(result.errors);
		}
	}

	const handleGetCoords = async () => {
		setIsLoading(true);
		try {
			const { lat, long } = await getCoords();

			formData.location = `${lat},${long}`;
			setCoords({ lat, long });
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
		setFormData((prevState) => {
			const formData = new FormData();
			formData.append('imageUrl', file);
			return { ...prevState, ...formData };
		});
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
	const { colorMode } = useColorMode();
	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white'
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white'
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused
				? colorMode === 'dark' ? '#A0AEC0' : 'gray.100'
				: colorMode === 'dark' ? '#1A202C' : '#F7FAFC',
			color: colorMode === 'dark' ? 'white' : 'black'
		})
	};
	return (
		<form onSubmit={handleSubmit}>
			<Heading size="lg">Update {formData.commonName}</Heading>

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

			<FormControl p="1" id="quantity">
				<FormLabel>Quantity</FormLabel>
				<Input name="quantity" type="number" value={Number(formData.quantity)} onChange={handleChange} />
			</FormControl>

			<FormControl p="1" id="note">
				<FormLabel>Note</FormLabel>
				<Textarea name="note" value={formData.note} onChange={handleChange} />
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

			<FormControl p="1" id="image">
				<FormLabel>Image</FormLabel>
				<UploadImage onFileChange={handleFileChange} />
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

export default EditSamples;
