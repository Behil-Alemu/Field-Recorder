import React from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Image
} from '@chakra-ui/react';
import MapComponent from './MapComponent';

const DisplayMap = ({ samples }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			<Button size="lg" colorScheme="teal" variant="outline" onClick={onOpen}>
				View map with samples location
			</Button>

			<Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Pinned samples </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<MapComponent samples={samples} />
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" colorScheme="blue" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default DisplayMap;
