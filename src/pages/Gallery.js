import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db, storage, app } from "../firebase-config";

import { useState, useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";

import {
    Box,
    Button,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Image,
    SimpleGrid,
    Center,
    Input,
} from "@chakra-ui/react";

function Gallery({ setLanding, login }) {
    const [progresspercent, setProgresspercent] = useState(0);
    const [images, setImages] = useState([]);

    const galleryRef = collection(db, "gallery");

    const new_date = new Date();

    useEffect(() => {
        setLanding(false);
    });

    //load 기존 이미지
    async function fetchImages() {
        const result = await getDocs(query(galleryRef, orderBy("timestamp")));
        setImages(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        fetchImages();
    }, []);

    //firebase create
    const imageLink = async (link) => {
        await addDoc(galleryRef, {
            image_link: link,
            timestamp: new_date.getTime(),
        });
        fetchImages();
        setProgresspercent(() => 0);
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
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    imageLink(downloadURL);
                });
            }
        );
    };

    function ImageTile(image) {
        return (
            <Box height="300px">
                <a
                    href={image.data.image_link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src={image.data.image_link}
                        alt=""
                        maxHeight="300px"
                        objectFit="cover"
                    />
                </a>
            </Box>
        );
    }

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
                width="80vw"
                marginTop="calc(12vh - 20px)"
                paddingBottom="8vh"
            >
                {login ? (
                    <Center marginBottom="50px">
                        <form onSubmit={handleSubmit}>
                            <FormLabel>Choose Image to Upload</FormLabel>
                            <Flex>
                                <input type="file" />
                                <Text>{progresspercent}%</Text>
                                <Button
                                    type="submit"
                                    marginLeft="20px"
                                    colorScheme="teal"
                                >
                                    Upload
                                </Button>
                            </Flex>
                        </form>
                    </Center>
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
