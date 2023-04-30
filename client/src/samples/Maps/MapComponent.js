import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
const key = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
	width: '530px',
	height: '400px'
};

function MapComponent({ samples }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: key
	});
	// const locations = samples.map((sample) => JSON.parse(sample.location));
	
	const locations = samples.filter(sample => sample.location).map(sample => JSON.parse(sample.location));

	

	const center = locations[0];
	const onLoad = (marker) => {
		console.log('marker: ');
	};

	function createKey(position) {
		return position.lat + position.lng;
	}

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
			{' '}
			<MarkerClusterer>
				{(clusterer) =>
					locations.map((location) => (
						<Marker key={createKey(location)} position={location} clusterer={clusterer} />
					))}
			</MarkerClusterer>
		</GoogleMap>
	) : (
		<div />
	);
}

export default React.memo(MapComponent);
