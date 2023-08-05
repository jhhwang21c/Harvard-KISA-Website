import { Box, Button, Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";

import { useState, useEffect, useId } from "react";
import "./Landing.css";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase-config";

function Landing({ setLanding }) {
    useEffect(() => {
        setLanding(false);
    });

    const [board, setBoard] = useState([]);
    const [load, setLoad] = useState(false);

    const usersCollectionRef = collection(db, "board");

    const uniqueId = useId();

    useEffect(() => {
        // 비동기로 데이터 받을준비
        const getData = async () => {
            // getDocs로 컬렉션안에 데이터 가져오기
            const data = await getDocs(usersCollectionRef);
            setBoard(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoad(true);
        };

        getData();
    }, []);

    return (
        <Flex align="center" width="100%" flexDirection="column">
            <Box
                borderBottom="1px"
                borderColor="#a9a9a9"
                height="100px"
                width="100vw"
            />
            <Flex
                justify="center"
                align="center"
                flexDirection="column"
                width="70vw"
                marginTop="calc(12vh - 20px)"
                paddingBottom="8vh"
            >
                <Text fontSize="4.5vh" color="Black" marginBottom="30px">
                    2023-2024 Board Members
                </Text>
                <SimpleGrid
                    columns={3}
                    spacingX="7vw"
                    spacingY="6vh"
                    width="100%"
                    border="1px"
                    borderRadius="50px"
                    padding="30px"
                >
                    {/* co-president 1 */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[0].picture : ""}
                            fallbackSrc="https://via.placeholder.com/200"
                            alt="President"
                            marginBottom="5px"
                            objectFit="cover"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Co-President
                        </Text>
                        <Text fontSize="1.3vw" alt="co-president">
                            {load ? board[0].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="co-president">
                            {load ? board[0].year : "class of"}
                        </Text>
                    </Box>
                    {/* co-president 2 */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[1].picture : ""}
                            alt="President"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Co-President
                        </Text>
                        <Text fontSize="1.3vw" alt="co-president">
                            {load ? board[1].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="co-president">
                            {load ? board[1].year : "class of"}
                        </Text>
                    </Box>
                    {/* secretary */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[4].picture : ""}
                            alt="secretary"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Secretary
                        </Text>
                        <Text fontSize="1.3vw" alt="Secretary">
                            {load ? board[4].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="Secretary">
                            {load ? board[4].year : "class of"}
                        </Text>
                    </Box>
                    {/* social chair 1 */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[5].picture : ""}
                            alt="social1"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Social Chair
                        </Text>
                        <Text fontSize="1.3vw" alt="social chair">
                            {load ? board[5].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="social chairt">
                            {load ? board[5].year : "class of"}
                        </Text>
                    </Box>
                    {/* social chair 2 */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[6].picture : ""}
                            alt="social2"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Social Chair
                        </Text>
                        <Text fontSize="1.3vw" alt="social chair">
                            {load ? board[6].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="social chair">
                            {load ? board[6].year : "class of"}
                        </Text>
                    </Box>
                    {/* finance chair */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[2].picture : ""}
                            alt="finance"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Finance Chair
                        </Text>
                        <Text fontSize="1.3vw" alt="Finance Chair">
                            {load ? board[2].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="Finance Chair">
                            {load ? board[2].year : "class of"}
                        </Text>
                    </Box>
                    {/* public relations chair */}
                    <Box bg="" width="16vw" align="center" margin="2%">
                        <Image
                            borderRadius="full"
                            boxSize="14vw"
                            src={load ? board[3].picture : ""}
                            alt="public relations"
                            marginBottom="5px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/200"
                        />
                        <Text as="b" fontSize="1.5vw">
                            Public Relations Chair
                        </Text>
                        <Text fontSize="1.3vw" alt="public relations chair">
                            {load ? board[3].name : "name"}
                        </Text>
                        <Text fontSize="1.3vw" alt="public relations chair">
                            {load ? board[3].year : "class of"}
                        </Text>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    );
}

export default Landing;
