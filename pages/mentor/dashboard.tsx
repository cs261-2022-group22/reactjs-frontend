import { Grid } from "@mui/material";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { Appointment } from "utils/proto/meeting";
import { AccountClient, MeetingClient } from "utils/rpcClients";

export default function MentorDashboard(props: { messages: string[]; appointments: Appointment[]}) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    Top left
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable={false} appointments={props.appointments} />
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

    // const accountClient = new AccountClient();
    // const notificationsResult = await accountClient.listNotificationsAsync({
    //     userid: session["id"] as number,
    //     targetProfileType: ProfileType.MENTOR,
    // });

	const meetingClient = new MeetingClient();
    // const appointmentsResult = await meetingClient.listAppointmentsAsync({
    //     userid: session["id"] as number,
    //     profileType: ProfileType.MENTOR,
    // });

	const poaResult = await meetingClient.listPlansOfActionAsync({
        userid: session["id"] as number,
    });

	console.log(poaResult);
    return {
        props: {
            messages: ["test"],
            // appointments: appointmentsResult,
        },
        // props: {
        //     messages: notificationsResult.desiredNotifications,
		// 	appointments: appointmentsResult,
		// },
    };
}
