import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
const key = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
	width: '530px',
	height: '400px'
};

function EditMapComponent({ onMapClick }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: key
	});

	const [ clickedLocation, setClickedLocation ] = useState(null);

    const center = { lat: 37.0902, lng: -95.7129 };

	const handleClick = (event) => {
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		console.log(`Clicked at (${lat}, ${lng})`);
		setClickedLocation({ lat, lng });
		onMapClick && onMapClick(lat, lng);
	};

	function createKey(position) {
		if (!position) {
			return null;
		}
		return position.lat + position.lng;
	}

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={handleClick}>
			{clickedLocation && <Marker position={clickedLocation} />}
			<MarkerClusterer>
				{(clusterer) => (
					<Marker key={createKey(clickedLocation)} position={clickedLocation} clusterer={clusterer} />
				)}
			</MarkerClusterer>
		</GoogleMap>
	) : (
		<div />
	);
}

export default React.memo(EditMapComponent);
