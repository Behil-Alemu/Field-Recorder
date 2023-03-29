import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";


export default function LandingLayout(props) {
  const animalImg = useColorModeValue('linear(to-r, green.100, teal.500)', 'linear(to-r, green.50, green.200)')

  return (

    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      
      {props.children}
    </Flex>
  );
}
