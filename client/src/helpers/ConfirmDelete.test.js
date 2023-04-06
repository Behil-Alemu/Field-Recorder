import React from 'react';
import { render } from '@testing-library/react';
import ConfirmDelete from './ConfirmDelete';

it("renders without crashing", function() {
  render(<ConfirmDelete />);
});

it('matches snapshot for danger', function() {
    const { asFragment } = render(<ConfirmDelete />);
	expect(asFragment()).toMatchSnapshot();
});


