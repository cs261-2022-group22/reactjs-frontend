/* import { Grid } from "@mui/material";
import MentorLinks from "components/MentorLinks";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient } from "utils/rpcClients";
export default function MentorDashboard(props: { messages: string[]; }) {
    console.log(props.messages)
    return (<>
    test
    </>
    )}
export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {
                messages: []
            }
        };
    }

    const client = new AccountClient();
    const notificationsResult = await client.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });
   // const menteesResult = await client.getMenteesByMentorIdAsync({
       // mentorUserId: session["id"] as number
   // })
   
    return {
        props: {
            messages: notificationsResult.desiredNotifications,
           // menteelist: menteesResult.mentees,
        },
    };
} */



import { Button, CardActions, Grid, ListItem, Stack } from "@mui/material";
import MentorLinks from "components/MentorLinks";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient } from "utils/rpcClients";
import { Card, CardContent, List, Typography } from "@mui/material";

export default function Test(props: { messages: any[]  }) {
    
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
                            Give Feedback
                        </Typography>
                    </Stack>
                    <List>
                        <Card
                            sx={{
                                overflow: "auto",
                                maxHeight: "50vh",
                                boxShadow: "0",
                                ml: "-1vh",
                                pb: "1vh",
                            }}
                        >
                            {props.messages.map((name) => {
                                return (
                                    <Card
                                        sx={{
                                            mt: "1vh",
                                            ml: "1vh",
                                            pl: "1vh",
                                            boxShadow: 1,
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                        key={name}
                                        
                                    >

                                        <CardActions>
                                     
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                mb: "1vh",
                                                pt: "4px",
                                                mr: "2vh",
                                            }}
                                        >
                                            {name.name}
                                        
                                        </Typography>
                                        <Button sx = {{mr: "1vh", ml: "1vh"}} variant = "contained" size="small">Matching Feedback</Button>
                                        <Button sx = {{mr: "1vh", ml: "1vh"}} variant ="contained" size="small">Development Feedback</Button>
                                        </CardActions>
                                       
                                       
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

 
 



export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {
                messages: []
            }
        };
    }

    const client = new AccountClient();
   
    
    const menteesResult = await client.getMenteesByMentorIdAsync({
        mentorUserId: session["id"] as number
    })
   
    return {
        props: {
            messages: menteesResult.mentees,
           // menteelist: menteesResult.mentees,
        },
    };
}
