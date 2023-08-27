import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const NotFound = ({ setLanding }) => {
    useEffect(() => {
        setLanding(false);
    });
    return (
        <Flex align="center" width="100%" flexDirection="column">
            <Flex
                justify="center"
                align="center"
                flexDirection="column"
                width="85vw"
                height="80vh"
                marginTop="120px"
                paddingBottom="10px"
            >
                <h1>Oop! Wrong page buddy!</h1>
            </Flex>
        </Flex>
    );
};

export default NotFound;
