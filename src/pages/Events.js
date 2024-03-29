import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Flex, Box } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { MobileView, BrowserView } from "react-device-detect";

import "./Events.css";

export default function Events({ setLanding }) {
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    useEffect(() => {
        setLanding(false);
    });

    return (
        <>
            <MobileView>
                <Flex align="center" width="100%" flexDirection="column">
                    <Box paddingTop="120px" width="80vw" paddingBottom="50px">
                        <FullCalendar
                            plugins={[dayGridPlugin, googleCalendarPlugin]}
                            initialView="dayGridMonth"
                            googleCalendarApiKey={apiKey}
                            events={{
                                googleCalendarId: "harvardkisa@gmail.com",
                            }}
                            eventDisplay={"block"}
                            eventTextColor={"#FFF"}
                            eventColor={"#F2921D"}
                            height={"70vh"}
                            eventClick={function (info) {
                                info.jsEvent.preventDefault(); // don't let the browser navigate

                                if (info.event.url) {
                                    window.open(info.event.url);
                                }
                            }}
                        />
                    </Box>
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
                    <Box paddingTop="50px" width="60vw" paddingBottom="50px">
                        <FullCalendar
                            plugins={[dayGridPlugin, googleCalendarPlugin]}
                            initialView="dayGridMonth"
                            googleCalendarApiKey={apiKey}
                            events={{
                                googleCalendarId: "harvardkisa@gmail.com",
                            }}
                            eventDisplay={"block"}
                            eventTextColor={"#FFF"}
                            eventColor={"#F2921D"}
                            height={"80vh"}
                            eventClick={function (info) {
                                info.jsEvent.preventDefault(); // don't let the browser navigate

                                if (info.event.url) {
                                    window.open(info.event.url);
                                }
                            }}
                        />
                    </Box>
                </Flex>
            </BrowserView>
        </>
    );
}
