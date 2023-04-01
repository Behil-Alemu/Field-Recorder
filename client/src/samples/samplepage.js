import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';
import Sampletable from './Sampletable';
import SampleForm from './SampleForm';
import DisplayMap from './Maps/DisplayMap';

function Samplepage() {
	const { folderName, id } = useParams();
	const [ formErrors, setFormErrors ] = useState([]);
	const { currentUser, token } = useContext(UserContext);
	const [ samples, setSamples ] = useState([]);
	console.debug('Samplepage', 'currentUser=', currentUser, 'samples=', samples, 'formErrors', formErrors);

	useEffect(function getSamplessOnMount() {
		console.debug('SampleList useEffect getSamplesOnMount');
		sampleList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function sampleList() {
		try {
			SamplesApi.token = token;
			let result = await SamplesApi.getSamples(currentUser.username, folderName);
			setSamples(result);
		} catch (err) {
			console.log(err);
			setFormErrors(err);
		}
	}
	if (!samples) {
		console.log('no samples added yet');
	}
	const updateSamples = (deletedSampleId) => {
		setSamples((prevSamples) => prevSamples.filter((Sample) => Sample.sample_id !== deletedSampleId));
	};

	return (
		<Box p={4}>
			<Heading as="h4" size="md" mb={4}>
				Project Name: {folderName}
			</Heading>
			<Box>
				<SampleForm />
			</Box>
			
			<DisplayMap samples={samples} />
			<div>
				{samples && samples.length > 0 ? (
					<Box p={4} boxShadow="base">
						<Sampletable
							samples={samples}
							folderName={folderName}
							folder_id={id}
							updateSamples={updateSamples}
						/>
					</Box>
				) : (
					<Card maxW="md" align="center" bg="red.50">
						<CardHeader>
							<Heading size="md">Sorry, no projects yet!</Heading>
						</CardHeader>
						<CardBody>
							<Text>Use above form :|</Text>
						</CardBody>
					</Card>
				)}
			</div>
		</Box>
	);
}

export default Samplepage;
