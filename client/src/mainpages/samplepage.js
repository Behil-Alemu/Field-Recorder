import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import UserContext from '../auth/UserContext';
import SamplesApi from '../api/SamplesApi';
import Sampletable from './Sampletable';
import SampleForm from './SampleForm';
import LoadingSpinner from '../helpers/LoadingSpinner';

function Samplepage() {
	const { folderName } = useParams();
	const [ formErrors, setFormErrors ] = useState([]);
	const { currentUser, token } = useContext(UserContext);
	const [ samples, setSamples ] = useState([]);
	console.debug('Samplepage', 'currentUser=', currentUser, 'samples=', samples, 'formErrors', formErrors);

	useEffect(function getSamplessOnMount() {
		console.debug('SampleList useEffect getSamplesOnMount');
		sampleList();
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
		return <LoadingSpinner />;
	}
	return (
		<Box p={4}>
			<Heading as="h1" size="lg" mb={4}>
				Project Name: {folderName}
			</Heading>
			<SampleForm />
			<div>
				{samples.length ? (
					<Sampletable />
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
