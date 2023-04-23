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
import noImage from '../../images/cat.png';

const HandleImage = ({ url, name }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			<Button size="sm" variant="ghost" colorScheme="blue" onClick={onOpen}>
				Review Image
			</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					{url ? <ModalHeader>{name}</ModalHeader> : <ModalHeader>Not Valid Image</ModalHeader>}
					<ModalCloseButton />
					<ModalBody>{url ? <Image src={url} /> : <Image src={noImage} />}</ModalBody>
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

export default HandleImage;
