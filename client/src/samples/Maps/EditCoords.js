import React, { useState } from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure
} from '@chakra-ui/react';
import EditMapComponent from './EditMapComponent';

const EditCoords = ({ setCoords, setIsLoading, handleGetCoords }) => {
	const [ location, setLocation ] = useState({ lat: null, lng: null });

	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleSave = async () => {
		setIsLoading(true);
		try {
			if (location) {
				await setCoords({ lat: location.lat, lng: location.lng });
				handleGetCoords(location.lat, location.lng);
			}
			onClose();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};
	const handleMapClick = (lat, lng) => {
		setLocation({ lat, lng });
	};

	return (
		<div>
			<Button size="lg" colorScheme="teal" variant="outline" onClick={onOpen}>
				Edit Location
			</Button>

			<Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Lng: {location.lng}, Lat: {location.lat}
					</ModalHeader>

					<ModalCloseButton />
					<ModalBody>
						<EditMapComponent onMapClick={handleMapClick} />
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" colorScheme="blue" onClick={onClose}>
							Close
						</Button>
						<Button variant="solid" colorScheme="blue" onClick={handleSave}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default EditCoords;
