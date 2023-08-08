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

import { useState, useEffect, useRef } from "react";

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
} from "@chakra-ui/react";

function Gallery({ setLanding, login }) {
    const [progresspercent, setProgresspercent] = useState(0);
    const [images, setImages] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const galleryRef = collection(db, "gallery");

    const [inputs, setInputs] = useState({
        date: "",
        title: "",
    });

    const { date, title } = inputs; //inputs 객체 비구조화 할당

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setLanding(false);
    });

    //load 기존 이미지
    async function fetchImages() {
        const result = await getDocs(
            query(galleryRef, orderBy("timestamp", "desc"))
        );
        setImages(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        fetchImages();
    }, []);

    //firebase create
    const imageData = async (downloadURL, storageRef) => {
        await addDoc(galleryRef, {
            image_link: downloadURL,
            title: title, //inputs.title
            timestamp: date,
            ref: storageRef,
        });
        fetchImages();
        setProgresspercent(() => 0);
        setInputs({ date: "", title: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, `gallery/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                onClose();
                setProgresspercent(progress);
            },
            (error) => {
                onClose();
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    imageData(downloadURL, `gallery/${file.name}`);
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

        await deleteDoc(doc(db, "gallery", dbID))
            .then(() => {
                console.log("Document successfully deleted!");
                fetchImages();
            })
            .catch((error) => {
                alert("Error removing document: ", error);
            });
    };

    function ImageTile(image) {
        return (
            <Box height="300px">
                <Flex direction="column" align="center">
                    <a
                        href={image.data.image_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src={image.data.image_link}
                            alt=""
                            height="250px"
                            objectFit="cover"
                        />
                    </a>
                    <Text>{image.data.timestamp}</Text>
                    <Text>{image.data.title}</Text>
                    {login ? (
                        <Button
                            width="80px"
                            height="20px"
                            fontSize="10px"
                            color="red"
                            onClick={() =>
                                handleDelete(image.data.ref, image.data.id)
                            }
                        >
                            Delete
                        </Button>
                    ) : (
                        <></>
                    )}
                </Flex>
            </Box>
        );
    }

    return (
        <Flex align="center" width="100%" flexDirection="column">
            <Box height="100px" width="100vw" />
            <Flex
                justify="center"
                align="center"
                flexDirection="column"
                width="80vw"
                marginTop="calc(12vh - 20px)"
                paddingBottom="8vh"
            >
                {login ? (
                    //이미지 업로드 modal
                    <>
                        <Flex marginBottom="40px">
                            <Button onClick={onOpen} colorScheme="teal" mr={3}>
                                Upload Photo
                            </Button>
                            <Text>{progresspercent}%</Text>
                        </Flex>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Upload Photo</ModalHeader>
                                <ModalCloseButton />
                                <form onSubmit={handleSubmit}>
                                    <ModalBody>
                                        <FormLabel>
                                            Choose Image to Upload
                                        </FormLabel>
                                        <input type="file" />
                                        <FormLabel marginTop="10px">
                                            Date
                                        </FormLabel>
                                        <Input
                                            placeholder="Select Date and Time"
                                            type="date"
                                            value={date}
                                            name="date"
                                            onChange={handleInputChange}
                                        />
                                        <FormLabel marginTop="10px">
                                            Title
                                        </FormLabel>
                                        <Input
                                            placeholder="yyyy/mm/dd   ~~event "
                                            value={title}
                                            name="title"
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

                {images.length > 0 ? (
                    <SimpleGrid
                        minChildWidth="200px"
                        spacing="30px"
                        width="100%"
                    >
                        {images.map((image, index) => {
                            return <ImageTile data={image} key={index} />;
                        })}
                    </SimpleGrid>
                ) : (
                    <>No Photo</>
                )}
            </Flex>
        </Flex>
    );
}
export default Gallery;
