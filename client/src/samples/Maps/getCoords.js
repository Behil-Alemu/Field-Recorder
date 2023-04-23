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
			const lng = position.coords.longitude;
			resolve({ lat, lng });
		};

		const error = (error) => {
			console.error(`Error getting location: ${error}`);
			reject(error);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	});
};
export { getCoords };
