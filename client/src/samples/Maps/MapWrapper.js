import { Wrapper, Status } from '@googlemaps/react-wrapper';
import LoadingSpinner from '../../helpers/LoadingSpinner';
import { NotifyRed } from '../../helpers/Alert';
import GoogleMap from '../Maps/GoogleMap';
import React from 'react';

const API_KEY = 'AIzaSyDzzPH5NHXC6Sl-rlTAF7YkdL3_UH2kRIU';

const render = (status) => {
	if (status === Status.FAILURE) return <NotifyRed />;
	return <LoadingSpinner />;
};

function MapWrapper() {
	const center = { lat: -34.397, lng: 150.644 };
	const zoom = 4;
	return (
		<Wrapper apiKey={API_KEY} render={render}>
        
		<GoogleMap center={center} zoom={zoom} />
		</Wrapper>
	);
}
export default MapWrapper;
