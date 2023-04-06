import React from 'react';
import { render } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { MemoryRouter } from 'react-router';

it('matches snapshot without logo', function() {
	const { asFragment } = render(
		<MemoryRouter>
			<ProjectCard folderName="cat" />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
