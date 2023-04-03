import React, { useContext } from 'react';
import { Tabs, TabList, Tab, Flex, Image, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import UserContext from '../auth/UserContext';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavigationBar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);
	const { colorMode, toggleColorMode } = useColorMode();
	const bg = useColorModeValue('linear(to-r, green.100, teal.500)', 'linear(to-r, green.50, green.200)');
	const color = useColorModeValue('white', 'green.800');

	function loggedInNav() {
		return (
			<TabList>
				<Link to="/homepage">
					<Tab color={color}>My Projects</Tab>
				</Link>
				<Link to="/profile">
					<Tab color={color}>{currentUser.first_name || currentUser.username}</Tab>
				</Link>
				<Link to="/login" onClick={logout}>
					<Tab color="red.300">Log out</Tab>
				</Link>
			</TabList>
		);
	}
	function loggedOutNav() {
		return (
			<TabList>
				<Link to="/signup">
					<Tab color={color}>Sign Up</Tab>
				</Link>
				<Link to="/login">
					<Tab color={color}>Login</Tab>
				</Link>
			</TabList>
		);
	}

	return (
		<Flex bgGradient={bg} p={4} alignItems="center" justifyContent="space-between">
			<Tabs colorScheme="white">
				<TabList>
					<Tab>
						<Link to="/">
							<Image borderRadius="full" src={logo} alt="Logo" h="40px" />
						</Link>
					</Tab>
				</TabList>
			</Tabs>
			<Tabs align="end" variant="soft-rounded" colorScheme="green">
				<TabList>
					{currentUser ? loggedInNav() : loggedOutNav()}
					<Tab>
						{colorMode === 'light' ? (
							<MoonIcon onClick={toggleColorMode}>Toggle Dark</MoonIcon>
						) : (
							<SunIcon onClick={toggleColorMode}>Toggle Light</SunIcon>
						)}
					</Tab>
				</TabList>
			</Tabs>
		</Flex>
	);
};

export default NavigationBar;
