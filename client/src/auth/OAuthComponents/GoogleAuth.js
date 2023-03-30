import React, { useState, useEffect } from 'react';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, CircularProgress } from '@chakra-ui/react';
import { GoogleIcon } from './ProviderIcons';

const GoogleAuth = ({profileData}) => {
	const [ user, setUser ] = useState([]);
	const [ profile, setProfile ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setUser(codeResponse);
			setLoading(false);
		},
		onError: (error) => {
			console.log('Login Failed:', error);
			setLoading(false);
		}
	});

	useEffect(
		() => {
			if (user) {
				setLoading(true);
				axios
					.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: 'application/json'
						}
					})
					.then((res) => {
						setProfile(res.data);
                        profileData(res.data)
						setLoading(false);
					})
					.catch((err) => {
						console.log(err);
						setLoading(false);
					});
			}
		},
		[ user ]
	);
	// log out function to log the user out of google and set the profile array to null
	const logOut = () => {
		googleLogout();
		setProfile(null);
	};
	console.log(profile);

	return (
		<div>
			{loading ? (
				<CircularProgress isIndeterminate color="green.300" />
			) : (
				<Button onClick={login}>
					Sign up with Google <GoogleIcon m={2} />
				</Button>
			)}
		</div>
	);
};

export default GoogleAuth;
