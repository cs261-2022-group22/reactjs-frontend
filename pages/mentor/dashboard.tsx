import { Grid } from "@mui/material";
import MenteeFeedbackList from "components/MentorFeedbackList";
import MentorLinks from "components/MentorLinks";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { MenteeReturn } from "utils/CommonTypes";
import { ProfileType } from "utils/proto/account";
import { AccountClient, MatchingClient } from "utils/rpcClients";

export default function MentorDashboard(props: {
    messages: string[];
    mentees: MenteeReturn[];
}) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    <MentorLinks />
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments
                        cancellable={false}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    <Notifications messages={props.messages} />
                </Grid>
                <Grid item xs={6}>
                    <MenteeFeedbackList mentees={props.mentees} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {
                messages: [],
                mentees: [],
            },
        };
    }

    const client = new AccountClient();
    const notificationsResult = await client.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });
    const client2 = new MatchingClient();
    const menteesResult = await client2.getMenteesByMentorIdAsync({
        mentorUserId: session["id"] as number,
    });

    return {
        props: {
            messages: notificationsResult.desiredNotifications,
            mentees: menteesResult.mentees,
        },
    };
}
