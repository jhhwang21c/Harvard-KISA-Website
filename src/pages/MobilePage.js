import React from "react";
import { Flex, Box, Center } from "@chakra-ui/react";

const MobilePage = () => {
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(document.location.href);
        alert("링크가 복사되었습니다!");
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            marginTop="40vh"
        >
            <p className="title">***PC로 접속해주세요***</p>
            <p className="description">
                아쉽게도 모바일은 아직 지원하지 않아요😥 <br />
                빨리 개발해보도록 하겠습니다!
            </p>
            <br />
            <br />
            <button onClick={handleLinkCopy}>링크 복사하기 *클릭*</button>
        </Flex>
    );
};

/** styled components */

export default MobilePage;
