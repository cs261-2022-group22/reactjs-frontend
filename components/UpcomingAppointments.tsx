import { Cancel as CancelIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { Card, List, ListItem, Paper, Stack, Typography } from "@mui/material";
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

export default function UpcomingAppointments(props: { cancellable: boolean }) {
    const ga = groupBy(test_data.appointments, "date");
    const d = [];
    for (const key in ga) {
        d.push(key);
    }

    console.log(props.cancellable);

    const [groupedAppointments] = useState(ga);
    const [dates] = useState(d);

    function update() {
        console.warn("updating");
    }

    return (
        <Paper variant='outlined' sx={{ padding: '10px', mt: '15px', boxShadow: 0, maxWidth: "100vh", backgroundColor: "transparent" }} elevation={0} >
            <Stack direction="row" justifyContent="space-between" sx={{ mb: '5px' }}>
                <Typography variant="h5">Upcoming Appointments</Typography>
                <RefreshIcon sx={{ "&:hover": { color: "blue" } }} onClick={update} />
            </Stack>
            <List sx={{ maxHeight: "37vh", overflowY: 'scroll' }}>
                {dates.map((date) => (
                    <Card sx={{ pr: '5px', pl: '8px', ml: '5px', mr: '5px', mt: "10px", boxShadow: 1, "&:hover": { boxShadow: 4 }, backgroundColor: "#fafafa" }} key={date}>
                        <Typography sx={{ fontWeight: "bold", mb: "-1vh", pt: "6px" }}>{date}</Typography>
                        <List>
                            {groupedAppointments[date].map(
                                (appointment: { name: string; date: string; time: string; duration: number; }) =>
                                (<ListItem sx={{ mb: "-1vh" }} key={appointment.date + appointment.time}>
                                    <Typography sx={{ fontWeight: "bold", mb: "-1px" }}>{appointment.time}</Typography>:
                                    Meeting with{" "}{appointment.name}{" "}for{" "}{appointment.duration}{" "}minutes
                                    {props.cancellable && <CancelIcon sx={{ color: "red", marginLeft: "auto" }} />}
                                </ListItem>)
                            )}
                        </List>
                    </Card>
                ))}
            </List>
        </Paper >
    );
}

