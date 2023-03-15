import React, { useContext } from 'react';
import { Tabs, TabList, Tab, TabPanel, Box, Flex, Image, useColorMode, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import UserContext from '../auth/UserContext';
import { MoonIcon } from '@chakra-ui/icons';

const NavigationBar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);
	const { colorMode, toggleColorMode } = useColorMode();
	function loggedInNav() {
		return (
			<TabList>
                <Link to="/homepage" >
					<Tab color="red.800">My Projects</Tab>
				</Link>
				<Link to="/login" onClick={logout}>
					<Tab color="red.800">Log out {currentUser.first_name || currentUser.username}</Tab>
				</Link>
			</TabList>
		);
	}
	function loggedOutNav() {
		return (
			<TabList>
				<Link to="/signup">
					<Tab color="green.800">Sign Up</Tab>
				</Link>
				<Link to="/login">
					<Tab color="green.800">Login</Tab>
				</Link>
			</TabList>
		);
	}

	return (
		<Flex bg="green.50" p={4} alignItems="center" justifyContent="space-between">
			<Tabs colorScheme='green'>
				<TabList>
					<Tab>
						<Link to="/">
							<Image borderRadius="full" src={logo} alt="Logo" h="40px" />
						</Link>
					</Tab>
				</TabList>
			</Tabs>
			<Tabs align='end' variant='soft-rounded' colorScheme='green'>
				<TabList>
					{currentUser ? loggedInNav() : loggedOutNav()}
					<Tab>
						{' '}
						<MoonIcon onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</MoonIcon>
					</Tab>
				</TabList>
			</Tabs>
		</Flex>
	);
};

export default NavigationBar;
