import { useColorMode } from '@chakra-ui/react';

function customStyles() {
	const { colorMode } = useColorMode();

	return {
		control: (provided) => ({
			...provided,
			backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white'
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white'
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? (colorMode === 'dark' ? 'gray.700' : 'gray.100') : 'transparent',
			color: colorMode === 'dark' ? 'white' : 'black'
		})
	};
}

export { customStyles };
