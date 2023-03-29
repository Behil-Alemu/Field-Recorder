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
import noImage from '../../images/cat.png'

const HandleImage = ({ url }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			<Button onClick={onOpen}>Review Image</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					{url ? <ModalHeader>Sample Image</ModalHeader> : <ModalHeader>Not Valid Image</ModalHeader>}
					<ModalCloseButton />
					<ModalBody>
						<Image src={url} fallbackSrc={noImage} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default HandleImage;
