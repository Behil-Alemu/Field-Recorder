import React, { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import UserContext from '../auth/UserContext';

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ element, ...rest }) {
	const { currentUser } = useContext(UserContext);

	console.debug('PrivateRoute', 'path=', 'element=', element);

	if (!currentUser) {
		return <Navigate to="/login" />;
	}

	return currentUser ? <Route {...rest} element={element} /> : <Navigate to="/signup" />;
}

export default PrivateRoute;
