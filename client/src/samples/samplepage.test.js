import React from 'react';
import { render } from '@testing-library/react';
import Samplepage from './samplepage';
import { MemoryRouter } from 'react-router';
import { UserProvider } from '../testUtils';
import ErrorBoundary from './ErrorBoundary';

it('matches snapshot with user', function() {
	let sample = {
		commonName: 'ant',
		scientificName: 'scientificAnt',
		quantity: 2,
		location: '41.4934° N, 8.1741° E',
		imageUrl: 'image.png',
		note: 'note it up',
		username: 'u1',
		folderId: 2
	};
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider sample={sample} currentUser={'test'}>
				<ErrorBoundary>
					<Samplepage />
				</ErrorBoundary>
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
