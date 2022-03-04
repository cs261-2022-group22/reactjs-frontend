import { Grid } from "@mui/material";
import Notifications from "components/Notification";
import MentorLinks from "components/MentorLinks";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient } from "utils/rpcClients";

export default function MentorDashboard(props: { messages: string[]; }) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    <MentorLinks />
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable={false} />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    <Notifications messages={props.messages} />
                </Grid>
                <Grid item xs={6}>
                    Bottom right
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
                messages: []
            }
        };
    }

    const client = new AccountClient();
    const notificationsResult = await client.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });

    return {
        props: {
            messages: notificationsResult.desiredNotifications,
        },
    };
}
