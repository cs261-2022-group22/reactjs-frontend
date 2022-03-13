import { Grid } from "@mui/material";
import MenteeLinks from "components/MenteeLinks";
import MentorFeedbackList from "components/MentorFeedbackList";
import Notifications from "components/Notification";
import { getSession, GetSessionParams } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient, MatchingClient } from "utils/rpcClients";

export default function MenteeDashboard(props: {messages: string[]; mentors: any[]}) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "48vh" }}>
                <Grid item xs={6}>
                    <MenteeLinks />
                </Grid>
                <Grid item xs={6}>
                    test
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    <Notifications messages={props.messages} />
                </Grid>
                <Grid item xs={6}>
                    <MentorFeedbackList mentors = {props.mentors}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);
    

    if (!session) {
        return {
            props: {
                messages: [],
                mentors: []
            }
    
        };
    
    }
    

    const client = new AccountClient();
    const client2 = new MatchingClient();
    
    const notificationsResult = await client.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });
   const mentorsResult = await client2.getMatchingMentorAsync({
    menteeUserId: session["id"] as number
    })
 
    return {
        props: {
            messages: notificationsResult.desiredNotifications,
            mentors: mentorsResult

        },
    };
}
