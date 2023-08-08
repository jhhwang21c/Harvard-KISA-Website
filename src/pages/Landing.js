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
                <Text fontSize="18px" color="Black" textAlign="justify">
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
                <br />
                <br />
                <Text fontSize="18px" color="Black" textAlign="justify">
                    저희 HCKISA는 하버드 대학교의 학생 운영 한인회 입니다.
                    저희는 대학을 위해 지구 반대편까지 여행한 우리 회원들에게
                    고향과 공동체 의식을 제공하는 것을 목적으로 하고 있습니다.
                    저희는 영화 상영, 스터디 브레이크, 리크루팅 이벤트, 다른
                    한인회와의 교류 행사 등의 다양한 이벤트를 개최하여 저희
                    구성원들의 학문적, 사회적, 전문적인 발전을 지원합니다.
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
