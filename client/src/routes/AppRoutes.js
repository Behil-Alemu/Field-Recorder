import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../landingpage/Landingpage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import PrivateRoute from '../auth/PrivateRoute';

function AppRoutes({ login, signup }) {
	console.debug('Routes', `login=${typeof login}`, `register=${typeof register}`);

	return (
		<div className="pt-5">
			<Routes>
				<Route path="/" element={<LandingPage />} />

				<Route path="/login" element={<LoginForm login={login} />} />

				<Route path="/signup" element={<SignupForm signup={signup} />} />

				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<ProfileForm />
						</PrivateRoute>
					}
				/>

				<Route path="/profile" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default AppRoutes;
