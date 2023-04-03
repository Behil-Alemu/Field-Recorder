import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../landingpage/Landingpage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import PrivateRoute from '../auth/PrivateRoute';
import Homepage from '../mainpages/Homepage';
import Samplepage from '../samples/samplepage';
import { Box } from '@chakra-ui/react';
import HandleImage from '../samples/SampleHelper.js/handeImage';
import EditSamples from '../samples/EditSamples';
import UserContext from '../auth/UserContext';

function AppRoutes({ login, signup }) {
	console.debug('Routes', `login=${typeof login}`, `signup=${typeof signup}`);
	const { currentUser } = useContext(UserContext);

	console.log(currentUser, '{{{{{{{us}}}}}}}');
	return (
		<Box m={4} align="center">
			<Routes>
				<Route path="/" element={<LandingPage />} />

				{/* <Route path="/login" element={<LoginForm login={login} />} />

				<Route path="/signup" element={<SignupForm signup={signup} />} /> */}

				<Route
					path="/login"
					element={currentUser ? <Navigate to="/homepage" /> : <LoginForm login={login} />}
				/>

				<Route
					path="/signup"
					element={currentUser ? <Navigate to="/homepage" /> : <SignupForm signup={signup} />}
				/>

				<Route path="/homepage" element={<Homepage />} />

				<Route path="/showImage/:sample_id" element={<HandleImage />} />

				{/* <Route path="/homepage" element={currentUser ? <Homepage /> : <Navigate to="/signup" />} /> */}

				<Route path="/homepage/:folderName/:id" element={<Samplepage />} />

				<Route path="/profile" element={<ProfileForm />} />

				{/* <PrivateRoute path="/profile" element={<ProfileForm />} /> */}

				<Route path="/editSample/:sample_id" element={<EditSamples />} />

				<Route path="/" element={<Navigate to="/" />} />
			</Routes>
		</Box>
	);
}

export default AppRoutes;
