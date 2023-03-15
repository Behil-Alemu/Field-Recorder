import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

function NotifyRed(props) {
	return (
		<Alert status="error">
			<AlertIcon />
			<AlertTitle>Error Occured!</AlertTitle>
			<AlertDescription>{props.error}</AlertDescription>
		</Alert>
	);
}

function NotifyGreen() {
	return (
		<Alert status="success">
			<AlertIcon />
			All Set!
		</Alert>
	);
}
export { NotifyRed, NotifyGreen };
