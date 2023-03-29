import React from 'react';

import Hero from './Hero';
import LandingLayout from './LandingLayout';

export default function Landingpage({logout}) {
	return (
		<LandingLayout>

			<Hero
				title="Field Recorder"
				subtitle="For research biologist-data entry and analysis app. Keep track of samples and pin the location of samples found. Accompanied by NatureServe Explorer REST API, an API that has information on rare and endangered species and ecosystems in the Americas."
				image="https://source.unsplash.com/collection/1360066/800x600"
				createText="Create your account now"
				signupLink="/signup"
			/>
		</LandingLayout>
	);
}
