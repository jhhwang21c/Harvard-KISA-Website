import React from "react";
import {
    Box,
    Button,
    Flex,
    Image,
    Spacer,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import "./Navbar.css";
import Logo from "./assets/logo2.png";
import { auth, loginEmail } from "./firebase-config";

import { signOut } from "firebase/auth";

import { useState } from "react";

import { BrowserView, MobileView } from "react-device-detect";

function Navbar({ landing, login, setLogin }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const btnRef = React.useRef();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs; //inputs 객체 비구조화 할당

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            tryLogin(email, password); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const tryLogin = async (email, password) => {
        try {
            await loginEmail(email, password);
            setLogin(() => true);
            onClose();
            setInputs({ email: "", password: "" });
            alert("login success");
        } catch (err) {
            alert("wrong id/password");
        }
    };

    const onLogOutClick = () => {
        signOut(auth);
        setLogin(() => false);
        alert("logout success");
    };

    return (
        <>
            <MobileView>
                <div className="Nav">
                    <Flex
                        justify="space-between"
                        align="center"
                        backgroundColor="rgba(0,0,0,0)"
                        height="90px"
                        marginTop="6px"
                    >
                        <Box marginLeft="5vw">
                            <Link to="/" rel="noreferrer">
                                <Image
                                    src={Logo}
                                    boxSize="40px"
                                    marginLeft="15px"
                                />
                                <Text
                                    fontSize="sm"
                                    marginLeft="10px"
                                    style={{
                                        color: landing ? "white" : "black",
                                    }}
                                >
                                    HCKISA
                                </Text>
                            </Link>
                        </Box>

                        <Button
                            ref={btnRef}
                            variant="ghost"
                            onClick={onOpen}
                            style={{
                                color: landing ? "white" : "black",
                            }}
                        >
                            <HamburgerIcon boxSize={8} />
                        </Button>

                        <Drawer
                            isOpen={isOpen}
                            placement="right"
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton marginTop="25px" />
                                <DrawerHeader marginTop="25px">
                                    <Link
                                        to="/"
                                        rel="noreferrer"
                                        onClick={onClose}
                                    >
                                        HCKISA
                                    </Link>
                                </DrawerHeader>

                                <DrawerBody>
                                    <VStack spacing="24px">
                                        <Link
                                            to="/pages/About"
                                            onClick={onClose}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontSize: "25px",
                                            }}
                                        >
                                            Team
                                        </Link>
                                        <Link
                                            to="/pages/Events"
                                            onClick={onClose}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontSize: "25px",
                                            }}
                                        >
                                            Events
                                        </Link>
                                        <Link
                                            to="/pages/Gallery"
                                            onClick={onClose}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontSize: "25px",
                                            }}
                                        >
                                            Gallery
                                        </Link>
                                    </VStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Flex>
                </div>
            </MobileView>

            <BrowserView>
                <div className="Nav">
                    <Flex
                        justify="space-between"
                        align="center"
                        backgroundColor="rgba(0,0,0,0)"
                        height="90px"
                        marginTop="6px"
                        style={{
                            boxShadow: landing
                                ? "0 0 0 0 rgba(0,0,0,0)"
                                : "0 2px 2px 0 rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* left side */}

                        <Box marginLeft="5vw">
                            <Link to="/" rel="noreferrer">
                                <Image
                                    src={Logo}
                                    boxSize="50px"
                                    marginLeft="15px"
                                />
                                <Text
                                    marginLeft="15px"
                                    style={{
                                        color: landing ? "white" : "black",
                                    }}
                                >
                                    HCKISA
                                </Text>
                            </Link>
                        </Box>

                        {/* right side - website menu */}
                        <Flex
                            justify="space-around"
                            align="center"
                            width="40%"
                            padding="30px"
                        >
                            <Box margin="0 15px">
                                <Link
                                    to="/pages/About"
                                    style={{
                                        textDecoration: "none",
                                        color: landing ? "white" : "black",
                                        fontSize: "25px",
                                    }}
                                >
                                    Team
                                </Link>
                            </Box>
                            <Spacer />
                            <Box margin="0 15px">
                                <Link
                                    to="/pages/Events"
                                    style={{
                                        textDecoration: "none",
                                        color: landing ? "white" : "black",
                                        fontSize: "25px",
                                    }}
                                >
                                    Events
                                </Link>
                            </Box>
                            <Spacer />
                            <Box margin="0 15px">
                                <Link
                                    to="/pages/Gallery"
                                    style={{
                                        textDecoration: "none",
                                        color: landing ? "white" : "black",
                                        fontSize: "25px",
                                    }}
                                >
                                    Gallery
                                </Link>
                            </Box>
                            <Box margin="0 15px">
                                {login ? (
                                    <Button
                                        onClick={onLogOutClick}
                                        width="80px"
                                        height="20px"
                                        fontSize="10px"
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={onOpen}
                                        width="80px"
                                        height="20px"
                                        fontSize="10px"
                                    >
                                        Admin Login
                                    </Button>
                                )}
                            </Box>

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Admin Login</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl isRequired>
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                id="email"
                                                placeholder="email"
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleInputChange}
                                            />
                                            <FormLabel marginTop="10px">
                                                Password
                                            </FormLabel>
                                            <Input
                                                id="pw"
                                                placeholder="password"
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={handleInputChange}
                                                onKeyDown={handleOnKeyPress}
                                            />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            colorScheme="blue"
                                            mr={3}
                                            onClick={() =>
                                                tryLogin(email, password)
                                            }
                                        >
                                            Login
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                    </Flex>
                </div>
            </BrowserView>
        </>
    );
}

export default Navbar;
