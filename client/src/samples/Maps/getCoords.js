const getCoords = () => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			console.log('Available');
		} else {
			console.log('Not Available');
			reject('Geolocation not available');
		}

		const success = (position) => {
			const lat = position.coords.latitude;
			const long = position.coords.longitude;
			console.log(`Latitude is: ${lat}`);
			console.log(`Longitude is: ${long}`);
			resolve({ lat, long });
		};

		const error = (error) => {
			console.error(`Error getting location: ${error}`);
			reject(error);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	});
};
export { getCoords };
