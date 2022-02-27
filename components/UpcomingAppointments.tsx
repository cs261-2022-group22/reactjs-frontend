import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
} from "@mui/material";

import groupBy from "lodash.groupby";

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

function UpcomingAppointments() {
    const groupedAppointments = groupBy(test_data.appointments, "date");
    const dates = [];
    for (const key in groupedAppointments) {
        console.log(groupedAppointments[key]);
        dates.push(key);
    }
    console.log(dates);

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
                    <Typography variant="h4" sx={{ mb: "-1vh", mt: "-1vh" }}>
                        Upcoming appointments
                    </Typography>
                    <List>
                        <Card
                            sx={{
                                overflow: "auto",
                                maxHeight: "38vh",
								boxShadow: "0",
								ml: "-1vh",
								pb: "1vh"
                            }}
                        >
                            {dates.map((date) => {
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
													pt: "4px"
                                                }}
                                            >
                                                {date}
                                            </Typography>
                                            <List>
                                                {groupedAppointments[date].map(
                                                    (appointment: { time: string; name: string; duration: string; }) => {
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
