import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import NavigationBar from './routes/NavigationBar';
import Routes from './routes/AppRoutes';
import LoadingSpinner from './helpers/LoadingSpinner';
import UsersApi from './api/UsersApi';
import UserContext from './auth/UserContext';
import * as jose from 'jose';

/** 
 * - infoLoaded: has user data been pulled from API?
 *   else show  "loading..."
 * - currentUser: user obj from API. passed via userContext to check is user is logged in
 * - token: real token is assigned after sign up
 *  
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

export const TOKEN_STORAGE_ID = 'TOKEN';

function App() {
	const [ infoReceived, setInfoReceived ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	console.debug('App', 'infoReceived=', infoReceived, 'currentUser=', currentUser, 'token=', token);

	useEffect(
		function fetchUserData() {
			async function getUser() {
				if (token) {
					try {
						let { username } = jose.decodeJwt(token);
						UsersApi.token = token;

						let currentUser = await UsersApi.getCurrentUser(username);
						setCurrentUser(currentUser);
					} catch (err) {
						console.log(err);
						setCurrentUser(null);
					}
				}
				setInfoReceived(true);
			}
			setInfoReceived(false);
			getUser();
		},
		[ token ]
	);

	/** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
	async function signup(signupData) {
		try {
			let token = await UsersApi.signup(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error('signup failed', errors);
			return { success: false, errors };
		}
	}

	/** Handles site-wide login.
     *
     * Make sure you await this function and check its return value!
     */
	async function login(loginData) {
		try {
			let token = await UsersApi.login(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error('login failed', errors);
			return { success: false, errors };
		}
	}
	/** Handles site-wide logout. */
	function logout() {
		setCurrentUser(null);
		setToken(null);
	}
	if (!infoReceived) return <LoadingSpinner />;

	return (
		<ChakraProvider>
			<BrowserRouter>
				<UserContext.Provider value={{ currentUser, setCurrentUser }}>
					<div className="App">
						{/* <NavigationBar logout={logout} /> */}
						
						<Routes login={login} signup={signup} />
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
