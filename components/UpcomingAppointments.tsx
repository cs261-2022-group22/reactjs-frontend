import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Stack,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import groupBy from "lodash.groupby";
import { useState } from "react";

const test_data = {
    appointments: [
        {
            name: "Alice",
            date: "27/02/2022",
            time: "9:00",
            duration: 60,
        },
        {
            name: "Bob",
            date: "27/02/2022",
            time: "10:00",
            duration: 60,
        },
        {
            name: "Bob",
            date: "28/02/2022",
            time: "15:00",
            duration: 30,
        },
        {
            name: "Bob",
            date: "29/02/2022",
            time: "15:00",
            duration: 30,
        },
        {
            name: "Bob",
            date: "30/02/2022",
            time: "15:00",
            duration: 30,
        },
        {
            name: "Bob",
            date: "10/03/2022",
            time: "15:00",
            duration: 30,
        },
    ],
};

const test_data2 = {
    appointments: [
        {
            name: "Charlie",
            date: "30/01/2022",
            time: "9:00",
            duration: 60,
        },
        {
            name: "Bob",
            date: "27/02/2022",
            time: "10:00",
            duration: 60,
        }
    ],
};

function UpcomingAppointments() {
    const groupedAppointments = groupBy(test_data.appointments, "date");
    const dates = [];
    for (const key in groupedAppointments) {
        dates.push(key);
    }

	const groupedAppointments2 = groupBy(test_data2.appointments, "date");
    const dates2 = [];
    for (const key in groupedAppointments2) {
        dates2.push(key);
    }

	const [testA, setTestA] = useState(groupedAppointments);
	const [testD, setTestD] = useState(dates);

	function update() {
		setTestA(groupedAppointments2)
		setTestD(dates2)
	}

    return (
        <>
            <Card
                sx={{
                    mt: "1vh",
                    boxShadow: 2,
                    "&:hover": { boxShadow: 2 },
                    mr: "1vh",
                    maxHeight: "45vh",
                    maxWidth: "100vh",
                    height: "100%",
                }}
            >
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography
                            variant="h4"
                            sx={{ mb: "-1vh", mt: "-1vh" }}
                        >
                            Upcoming appointments
                        </Typography>
                        <RefreshIcon sx={{ "&:hover": { color: "blue"}}} onClick={update}/>
                    </Stack>
                    <List>
                        <Card
                            sx={{
                                overflow: "auto",
                                maxHeight: "38vh",
                                boxShadow: "0",
                                ml: "-1vh",
                                pb: "1vh",
                            }}
                        >
                            {testD.map((date) => {
                                return (
                                    <>
                                        <Card
                                            sx={{
                                                mt: "1vh",
                                                ml: "1vh",
                                                pl: "1vh",
                                                boxShadow: 1,
                                                "&:hover": { boxShadow: 4 },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    mb: "-1vh",
                                                    pt: "4px",
                                                }}
                                            >
                                                {date}
                                            </Typography>
                                            <List>
                                                {testA[date].map(
                                                    (appointment: {
                                                        time: string;
                                                        name: string;
                                                        duration: number;
                                                    }) => {
                                                        return (
                                                            <ListItem
                                                                sx={{
                                                                    mb: "-1vh",
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    {
                                                                        appointment.time
                                                                    }
                                                                </Typography>
                                                                : Meeting with{" "}
                                                                {
                                                                    appointment.name
                                                                }{" "}
                                                                for{" "}
                                                                {
                                                                    appointment.duration
                                                                }{" "}
                                                                minutes
                                                            </ListItem>
                                                        );
                                                    }
                                                )}
                                            </List>
                                        </Card>
                                    </>
                                );
                            })}
                        </Card>
                    </List>
                </CardContent>
            </Card>
        </>
    );
}

export default UpcomingAppointments;
