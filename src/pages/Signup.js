import React, { useState } from "react";

import {
    Box,
    Button,
    Flex,
    Text,
    Center,
    Spacer,
    Input,
    InputGroup,
    InputRightElement,
    Image,
} from "@chakra-ui/react";

import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

function SignupPage(props) {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const handleChange1 = (event) => setEmail(event.target.value);
    const handleChange2 = (event) => setPassword(event.target.value);

    const auth = getAuth();
    const register = createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            sendEmailVerification(auth.currentUser);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    return (
        <Flex
            justify="center"
            align="center"
            width="100%"
            flexDirection="column"
        >
            <Flex
                justify="center"
                align="center"
                flexDirection="column"
                width="60vw"
                paddingTop="100px"
                paddingBottom="100px"
            >
                <Text>Email</Text>
                <Input
                    placeholder="Harvard Email"
                    value={Email}
                    onChange={handleChange1}
                />
                <Text>Password</Text>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="password"
                        value={Password}
                        onChange={handleChange2}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button>Sign Up</Button>
            </Flex>
        </Flex>
    );
}

export default SignupPage;
