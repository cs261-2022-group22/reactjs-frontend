import { Grid } from "@mui/material";
import Notifications from "components/Notification";
import MenteeLinks from "components/MenteeLinks";
import UpcomingAppointments from "components/UpcomingAppointments";
import { GetSessionParams, getSession } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient } from "utils/rpcClients";

export default function MenteeDashboard(props: { messages: string[] }) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "48vh" }}>
                <Grid item xs={6}>
                    <MenteeLinks />
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable={true} />
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
            props: [],
        };
    }

    const client = new AccountClient();
    const notificationsResult = await client.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTEE,
    });

    return {
        props: {
            messages: notificationsResult.desiredNotifications,
        },
    };
}
