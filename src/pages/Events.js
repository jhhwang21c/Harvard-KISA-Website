import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Flex, Box } from "@chakra-ui/react";

import { useState, useEffect } from "react";

export default function Events({ setLanding }) {
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    useEffect(() => {
        setLanding(false);
    });

    return (
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
                />
            </Box>
        </Flex>
    );
}
