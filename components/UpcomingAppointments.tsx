import {
    Cancel as CancelIcon,
    Refresh as RefreshIcon,
} from "@mui/icons-material";
import { Card, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import groupBy from "lodash.groupby";
import Link from "next/link";
import { useState } from "react";
import { NormalisedAppointment } from "utils/CommonTypes";

export default function UpcomingAppointments(props: {
    appointments: NormalisedAppointment[];
    cancellable: boolean;
}) {
    const ga = groupBy(props.appointments, "date");
    const d = [];
    for (const key in ga) {
        d.push(key);
    }

    console.log(d);
    console.log(props.cancellable);

    const [groupedAppointments] = useState(ga);
    const [dates] = useState(d);

    function update() {
        console.warn("updating");
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                padding: "10px",
                mt: "15px",
                boxShadow: 0,
                maxWidth: "100vh",
                backgroundColor: "transparent",
            }}
            elevation={0}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: "5px" }}
            >
                <Typography variant="h5">Upcoming Appointments</Typography>
                <RefreshIcon
                    sx={{ "&:hover": { color: "blue" } }}
                    onClick={update}
                />
            </Stack>
            <List sx={{ maxHeight: "37vh", overflowY: "scroll" }}>
                {dates.map((date) => (
                    <Card
                        sx={{
                            pr: "5px",
                            pl: "8px",
                            ml: "5px",
                            mr: "5px",
                            mt: "10px",
                            boxShadow: 1,
                            "&:hover": { boxShadow: 4 },
                            backgroundColor: "#fafafa",
                        }}
                        key={date}
                    >
                        <Typography
                            sx={{ fontWeight: "bold", mb: "-1vh", pt: "6px" }}
                        >
                            {date}
                        </Typography>
                        <List>
                            {groupedAppointments[date].map((appointment) => {
                                if (appointment.type == 0) {
                                    return (
                                        <Link
                                            href={appointment.link}
                                            key={
                                                appointment.date +
                                                appointment.time
                                            }
                                            passHref
                                        >
                                            <ListItem
                                                sx={{ mb: "-1vh" }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mb: "-1px",
                                                    }}
                                                >
                                                    {appointment.time}
                                                </Typography>
                                                : Meeting lasting{" "}
                                                {appointment.duration} minutes
                                                {props.cancellable && (
                                                    <CancelIcon
                                                        sx={{
                                                            color: "red",
                                                            marginLeft: "auto",
                                                        }}
                                                    />
                                                )}
                                            </ListItem>
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <Link
                                            href={appointment.link}
                                            key={
                                                appointment.date +
                                                appointment.time
                                            }
                                            passHref
                                        >
                                            <ListItem
                                                sx={{ mb: "-1vh" }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mb: "-1px",
                                                    }}
                                                >
                                                    {appointment.time}
                                                </Typography>
                                                : Workshop on{" "}
                                                {appointment.skill} lasting{" "}
                                                {appointment.duration} minutes
                                                {props.cancellable && (
                                                    <CancelIcon
                                                        sx={{
                                                            color: "red",
                                                            marginLeft: "auto",
                                                        }}
                                                    />
                                                )}
                                            </ListItem>
                                        </Link>
                                    );
                                }
                            })}
                        </List>
                    </Card>
                ))}
            </List>
        </Paper>
    );
}
