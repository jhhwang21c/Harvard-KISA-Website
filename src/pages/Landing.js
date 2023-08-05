import { Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";

import "./Landing.css";

import Hanwha from "../assets/hanwha.png";

import { useState, useEffect } from "react";

function Landing({ setLanding }) {
    useEffect(() => {
        setLanding(true);
    });

    return (
        <Flex
            justify="center"
            align="center"
            width="100%"
            flexDirection="column"
        >
            <Flex className="overlay" justify="center">
                <Text
                    fontSize="50px"
                    fontFamily="Ubuntu"
                    textShadow="0 3px #000000"
                    color="white"
                    position="absolute"
                    top="35vh"
                >
                    Welcome to Harvard College KISA
                </Text>
            </Flex>
            <Flex
                justify="center"
                align="center"
                flexDirection="column"
                width="60vw"
                paddingTop="70px"
                paddingBottom="70px"
            >
                <Text fontSize="18px" fontFamily="Ubuntu" color="Black">
                    The Harvard College Korean International Students
                    Association (HCKISA) is a student-run organization that
                    brings together undergraduates who identify as Korean
                    internationals. Our purpose is to provide a sense of home
                    and community for our membership who, for the most part,
                    have traveled halfway across the world for college. We host
                    events such as movie screenings, study breaks, outings,
                    recruiting events, and mixers with other Korean associations
                    around the Boston area to support the academic, social, and
                    professional development of our community members.
                </Text>
            </Flex>
            <Text fontSize="40px" fontFamily="Ubuntu" color="black">
                Our Sponsors
            </Text>
            <SimpleGrid minChildWidth="100px">
                <Image src={Hanwha} width="150px" />
            </SimpleGrid>
        </Flex>
    );
}

export default Landing;
