import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import {
    doc,
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    deleteDoc,
} from "firebase/firestore";
import { db, storage, app } from "../firebase-config";

import { useState, useEffect, useRef, useId } from "react";

import {
    Box,
    Button,
    Flex,
    Text,
    Image,
    SimpleGrid,
    Center,
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
    Select,
} from "@chakra-ui/react";
import { MobileView, BrowserView, isMobile } from "react-device-detect";

function About({ setLanding, login }) {
    useEffect(() => {
        setLanding(false);
    });

    const modal1 = useDisclosure();

    const [board, setBoard] = useState([]);

    const [progresspercent, setProgresspercent] = useState(0);

    const [inputs, setInputs] = useState({
        name: "",
        position: "",
        year: "",
        bio: "",
        grid_position: "",
    });
    const { name, position, year, bio, grid_position } = inputs; //inputs 객체 비구조화 할당

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const usersCollectionRef = collection(db, "board");

    //load 기존 data
    async function getData() {
        // getDocs로 컬렉션안에 데이터 가져오기
        const data = await getDocs(
            query(usersCollectionRef, orderBy("grid_position"))
        );
        setBoard(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getData();
    }, []);

    const memberData = async (downloadURL, storageRef) => {
        await addDoc(usersCollectionRef, {
            image_link: downloadURL,
            name: name, //inputs.title
            position: position,
            year: year,
            bio: bio,
            grid_position: Number(grid_position),
            ref: storageRef,
        });
        getData();
        setInputs({
            name: "",
            position: "",
            year: "",
            bio: "",
            grid_position: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, `board/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                modal1.onClose(); //modal function
                setProgresspercent(progress);
            },
            (error) => {
                modal1.onClose(); //modal function
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    memberData(downloadURL, `board/${file.name}`);
                });
            }
        );
    };

    const handleDelete = async (storageRef, dbID) => {
        const deleteRef = ref(storage, storageRef);
        await deleteObject(deleteRef)
            .then(() => {
                alert("deleted");
            })
            .catch((error) => {
                alert(error);
            });

        await deleteDoc(doc(db, "board", dbID))
            .then(() => {
                console.log("Document successfully deleted!");
                getData();
            })
            .catch((error) => {
                alert("Error removing document: ", error);
            });
    };

    function MemberTile(member) {
        return (
            <Flex bg="" direction="column" align="center" margin="1%">
                {isMobile ? (
                    <Image
                        borderRadius="full"
                        boxSize="30vw"
                        src={member.data.image_link}
                        alt="picture"
                        marginBottom="10px"
                        objectFit="cover"
                    />
                ) : (
                    <Image
                        borderRadius="full"
                        boxSize="14vw"
                        src={member.data.image_link}
                        alt="picture"
                        marginBottom="10px"
                        objectFit="cover"
                    />
                )}
                {isMobile ? (
                    <>
                        <Text as="b" fontSize="xl" alt="name & position">
                            {member.data.name}
                        </Text>
                        <Text as="b" fontSize="xl" alt="name & position">
                            {member.data.position}
                        </Text>
                    </>
                ) : (
                    <Text as="b" fontSize="xl" alt="name & position">
                        {member.data.name} | {member.data.position}
                    </Text>
                )}

                <Text fontSize="lg" alt="year">
                    {member.data.year}
                </Text>
                {isMobile ? (
                    <></>
                ) : (
                    <Box marginTop="10px" width="75%" align="center">
                        <Text fontSize="lg" alt="bio" as="i">
                            {member.data.bio}
                        </Text>
                    </Box>
                )}

                <br />
                {login ? (
                    <Button
                        width="60px"
                        height="20px"
                        fontSize="10px"
                        color="red"
                        onClick={() =>
                            handleDelete(member.data.ref, member.data.id)
                        }
                    >
                        Delete
                    </Button>
                ) : (
                    <></>
                )}
            </Flex>
        );
    }

    return (
        <>
            <MobileView>
                <Flex align="center" width="100%" flexDirection="column">
                    <Flex
                        justify="center"
                        align="center"
                        flexDirection="column"
                        width="85vw"
                        marginTop="120px"
                        paddingBottom="10px"
                    >
                        <Text fontSize="2xl" color="Black" marginBottom="20px">
                            2023-2024 Board Members
                        </Text>

                        {board.length > 0 ? (
                            <SimpleGrid
                                columns={2}
                                spacingX="15px"
                                spacingY="10px"
                                width="100%"
                                padding="5px"
                            >
                                {board.map((member, index) => {
                                    return (
                                        <MemberTile data={member} key={index} />
                                    );
                                })}
                            </SimpleGrid>
                        ) : (
                            <>No member</>
                        )}
                    </Flex>
                </Flex>
            </MobileView>
            <BrowserView>
                <Flex align="center" width="100%" flexDirection="column">
                    <Box
                        // borderBottom="1px"
                        // borderColor="#a9a9a9"
                        height="100px"
                        width="100vw"
                    />
                    <Flex
                        justify="center"
                        align="center"
                        flexDirection="column"
                        width="70vw"
                        marginTop="80px"
                        paddingBottom="60px"
                    >
                        <Text fontSize="40px" color="Black" marginBottom="30px">
                            2023-2024 Board Members
                        </Text>
                        {login ? (
                            //이미지 업로드 modal
                            <>
                                <Flex marginBottom="40px">
                                    <Button
                                        onClick={modal1.onOpen}
                                        colorScheme="teal"
                                        mr={3}
                                    >
                                        Add Member
                                    </Button>
                                    <Text>{progresspercent}%</Text>
                                </Flex>

                                <Modal
                                    isOpen={modal1.isOpen}
                                    onClose={modal1.onClose}
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Add Member</ModalHeader>
                                        <ModalCloseButton />
                                        <form onSubmit={handleSubmit}>
                                            <ModalBody>
                                                <FormLabel>
                                                    Choose Profile Image
                                                </FormLabel>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                />
                                                <FormLabel marginTop="10px">
                                                    Name
                                                </FormLabel>
                                                <Input
                                                    placeholder="Name"
                                                    value={name}
                                                    name="name"
                                                    onChange={handleInputChange}
                                                />
                                                <FormLabel marginTop="10px">
                                                    Position
                                                </FormLabel>
                                                <Input
                                                    placeholder="Position"
                                                    value={position}
                                                    name="position"
                                                    onChange={handleInputChange}
                                                />
                                                <FormLabel marginTop="10px">
                                                    Year
                                                </FormLabel>
                                                <Input
                                                    placeholder="class of '00"
                                                    value={year}
                                                    name="year"
                                                    onChange={handleInputChange}
                                                />
                                                <FormLabel marginTop="10px">
                                                    Bio
                                                </FormLabel>
                                                <Input
                                                    placeholder="Bio"
                                                    value={bio}
                                                    name="bio"
                                                    onChange={handleInputChange}
                                                />
                                                <FormLabel marginTop="10px">
                                                    Grid Position. Numbers only.
                                                    Top to bottom, left to right
                                                    in increasing order.
                                                </FormLabel>
                                                <Input
                                                    placeholder="Grid Position. Numbers only"
                                                    value={grid_position}
                                                    type="number"
                                                    name="grid_position"
                                                    onChange={handleInputChange}
                                                />
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button
                                                    type="submit"
                                                    marginLeft="20px"
                                                    colorScheme="teal"
                                                    mr={3}
                                                >
                                                    Upload
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </ModalContent>
                                </Modal>
                            </>
                        ) : (
                            <></>
                        )}

                        {board.length > 0 ? (
                            <SimpleGrid
                                columns={3}
                                spacingX="25px"
                                spacingY="20px"
                                width="100%"
                                border="1px"
                                borderRadius="50px"
                                padding="30px"
                            >
                                {board.map((member, index) => {
                                    return (
                                        <MemberTile data={member} key={index} />
                                    );
                                })}
                            </SimpleGrid>
                        ) : (
                            <>No member</>
                        )}
                    </Flex>
                </Flex>
            </BrowserView>
        </>
    );
}

export default About;
