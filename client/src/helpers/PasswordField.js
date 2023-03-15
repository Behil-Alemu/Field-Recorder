import { Input, InputGroup, InputRightElement, Button, FormControl } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

function PasswordField(props) {
	const [ show, setShow ] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<FormControl>
			<InputGroup size="md">
				<Input
					pr="4.5rem"
					type={show ? 'text' : 'password'}
					name="password"
					onChange={props.handleChange}
					value={props.passwordValue}
					required
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleClick}>
						{show ? 'Hide' : 'Show'}
					</Button>
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
}

export default PasswordField;
