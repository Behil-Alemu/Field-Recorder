import React from 'react';
import { render } from '@testing-library/react';
import ProjectList from './ProjectList';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';

it('matches snapshot', function() {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<ProjectList currentUser={null} />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
