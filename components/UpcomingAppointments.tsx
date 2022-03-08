import { Cancel as CancelIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { Card, CardContent, List, ListItem, Stack, Typography } from "@mui/material";
import groupBy from "lodash.groupby";
import { useState } from "react";
import { Appointment } from "utils/proto/meeting";


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

export default function UpcomingAppointments(props: { cancellable: boolean; appointments: Appointment[] }) {
    const ga = groupBy(test_data.appointments, "date");
    const d = [];
    for (const key in ga) {
        d.push(key);
    }

	console.log(props.appointments);
    console.log(props.cancellable);

    const [groupedAppointments] = useState(ga);
    const [dates] = useState(d);

    function update() {
        console.log("updating");
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
                        <RefreshIcon
                            sx={{ "&:hover": { color: "blue" } }}
                            onClick={update}
                        />
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
                            {dates.map((date) => {
                                return (
                                    <Card
                                        sx={{
                                            mt: "1vh",
                                            ml: "1vh",
                                            pl: "1vh",
                                            boxShadow: 1,
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                        key={date}
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
                                            {groupedAppointments[date].map(
                                                (appointment: {
                                                    name: string;
                                                    date: string;
                                                    time: string;
                                                    duration: number;
                                                }) => {
                                                    return (
                                                        <ListItem
                                                            sx={{
                                                                mb: "-1vh",
                                                            }}
                                                            key={
                                                                appointment.date +
                                                                appointment.time
                                                            }
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    mb: "-1px",
                                                                }}
                                                            >
                                                                {
                                                                    appointment.time
                                                                }
                                                            </Typography>
                                                            : Meeting with{" "}
                                                            {appointment.name}{" "}
                                                            for{" "}
                                                            {
                                                                appointment.duration
                                                            }{" "}
                                                            minutes
                                                            {props.cancellable ? <CancelIcon
                                                                sx={{
                                                                    color: "red",
                                                                    marginLeft:
                                                                        "auto",
                                                                }}
                                                            /> : <></>}
                                                        </ListItem>
                                                    );
                                                }
                                            )}
                                        </List>
                                    </Card>
                                );
                            })}
                        </Card>
                    </List>
                </CardContent>
            </Card>
        </>
    );
}

