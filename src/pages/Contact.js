import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import {
    Box,
    Button,
    Flex,
    Text,
    Center,
    Spacer,
    Input,
    Image,
} from "@chakra-ui/react";

function Contact() {
    return (
        <Flex
            justify="center"
            align="center"
            width="100%"
            flexDirection="column"
            paddingTop="200px"
        >
            <div>
                <h3>구글 로그인 테스트</h3>
                <button onClick={handleGoogleLogin}>로그인</button>
                <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
            </div>
        </Flex>
    );
}

export default App;
