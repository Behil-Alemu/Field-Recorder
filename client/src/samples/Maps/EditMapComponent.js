import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { getCoords } from './getCoords';
import LoadingSpinner from '../../helpers/LoadingSpinner';

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
	const [ MapisLoading, setMapIsLoading ] = useState(false);
	const [ clickedLocation, setClickedLocation ] = useState(null);
	const [ center, setCenter ] = useState({ lat: 0, lng: 0 });

	useEffect(() => {
		async function fetchCoords() {
			setMapIsLoading(true);
			const { lat, lng } = await getCoords();
			setCenter({ lat, lng });
		}
		fetchCoords();
		setMapIsLoading(false);
	}, []);

	const handleClick = (event) => {
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		console.log(`Clicked at (${lat}, ${lng})`);
		setClickedLocation({ lat, lng });
		onMapClick && onMapClick(lat, lng);
	};

	return isLoaded && !MapisLoading ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={handleClick}>
			{clickedLocation && <Marker position={clickedLocation} />}
		</GoogleMap>
	) : (
		<div>
			<LoadingSpinner />
		</div>
	);
}

export default React.memo(EditMapComponent);
