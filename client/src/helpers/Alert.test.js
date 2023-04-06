import React from 'react';
import { render } from '@testing-library/react';
import { NotifyGreen, NotifyRed } from './Alert';

it("renders without crashing", function() {
  render(<NotifyGreen />);
});

it("renders without crashing", function() {
  render(<NotifyGreen />);
});

it('matches snapshot for danger', function() {
	let messages = [ 'Everything is broken', 'Run for the hills' ];
	const { asFragment } = render(<NotifyRed type="danger" messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot for success', function() {
	let messages = [ 'Everything is awesome!' ];
	const { asFragment } = render(<NotifyGreen type="success" messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});
