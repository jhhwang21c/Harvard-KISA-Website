import React from "react";
import {
    Box,
    Button,
    Flex,
    Image,
    Spacer,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Center,
    Link,
} from "@chakra-ui/react";
import Icon from "./assets/Instagram_icon.png";

function Footer() {
    return (
        <Flex
            marginTop="50px"
            paddingTop="40px"
            paddingBottom="40px"
            bg="#304146"
            direction="column"
            align="center"
        >
            <Link href="https://www.instagram.com/hckisa_official/" isExternal>
                <Image src={Icon} alt="Instagram" boxSize="45px" />
            </Link>

            <Text color="white" marginTop="15px">
                harvardkisa@gmail.com
            </Text>
        </Flex>
    );
}

export default Footer;
