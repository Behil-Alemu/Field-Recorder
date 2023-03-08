import logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import NavigationBar from './Routes/NavigationBar';
import Routes from '../src/Routes/Routes';
import LoadingSpinner from './helpers/LoadingSpinner';
import FieldRecorderApi from './api/api';
import UserContext from './auth/UserContext';
import jwt from 'jsonwebtoken';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'Random token';

function App() {
  const [ infoReceived, setInfoReceived ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	console.debug('App', 'infoReceived=', infoReceived, 'currentUser=', currentUser, 'token=', token);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

	useEffect(
		function fetchUserData() {
			async function getUser() {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						FieldRecorderApi.token = token;

						let currentUser = await FieldRecorderApi.getCurrentUser(username);

						// console.log("username",currentUser)

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

		},[ token ]
	);


	/** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
	async function signup(signupData) {
		try {
			let token = await FieldRecorderApi.signup(signupData);
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
			let token = await FieldRecorderApi.login(loginData);
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
    <BrowserRouter>
    <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <NavigationBar logout={logout} />
        <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  </BrowserRouter>
	);
}

export default App;
