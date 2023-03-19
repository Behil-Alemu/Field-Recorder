import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../landingpage/Landingpage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import PrivateRoute from '../auth/PrivateRoute';
import Homepage from '../mainpages/Homepage';
import Samplepage from '../mainpages/samplepage';
import { Box } from '@chakra-ui/react';

function AppRoutes({ login, signup }) {
	console.debug('Routes', `login=${typeof login}`, `signup=${typeof signup}`);

	return (
		<Box m={8} align="center">
			<Routes>
				<Route path="/" element={<LandingPage />} />

				<Route path="/login" element={<LoginForm login={login} />} />

				<Route path="/signup" element={<SignupForm signup={signup} />} />

				<Route path="/homepage" element={<Homepage />} />

				{/* <Route
					path="/samplepage"
					element={
						<PrivateRoute>
							<Samplepage />
						</PrivateRoute>
					}
				/> */}

				<Route path="/homepage/:folderName/:id" element={<Samplepage />} />

				<Route path="/profile" element={<ProfileForm />} />

				<Route path="/" element={<Navigate to="/" />} />
			</Routes>
		</Box>
	);
}

export default AppRoutes;
