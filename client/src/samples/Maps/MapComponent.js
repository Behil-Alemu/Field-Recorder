import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const key = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
	width: '400px',
	height: '200px'
};

// const center = {
// 	lat: 42.3726399,
// 	lng: -71.1096528
// };
// const position = {
// 	lat: lat,
// 	lng: lng
// };

function MapComponent({ lat, lng }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: key
	});
  const position = {
    lat: lat,
    lng: lng
  };
  const center = {
    lat: lat?lat:42.3726399,
    lng: lng?lng:-71.1096528
  };
	const onLoad = (marker) => {
		console.log('marker: ');
	};

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
			{' '}
			<Marker onLoad={onLoad} position={position} />
		</GoogleMap>
	) : (
		<div />
	);
}

export default React.memo(MapComponent);
