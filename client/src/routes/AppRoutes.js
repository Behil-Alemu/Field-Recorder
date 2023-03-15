import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../landingpage/Landingpage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import PrivateRoute from '../auth/PrivateRoute';
import Homepage from '../mainpages/Homepage';
import Samplepage from '../mainpages/samplepage';

function AppRoutes({ login, signup }) {
	console.debug('Routes', `login=${typeof login}`, `register=${typeof register}`);

	return (
		<div>
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
				
				<Route path="/samplepage" element={<Samplepage />} />

				<Route path="/profile" element={<ProfileForm />} />

				<Route path="/" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default AppRoutes;
