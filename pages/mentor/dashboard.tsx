import { Grid } from "@mui/material";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { NormalisedAppointment } from "utils/CommonTypes";
import { ProfileType } from "utils/proto/account";
import { AccountClient, MeetingClient } from "utils/rpcClients";

export default function MentorDashboard(props: { messages: string[]; appointments: NormalisedAppointment[]}) {
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

    const accountClient = new AccountClient();
    const notificationsResult = await accountClient.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });

	const meetingClient = new MeetingClient();
    const appointmentsResult = await meetingClient.listAppointmentsAsync({
        userid: session["id"] as number,
        profileType: ProfileType.MENTOR,
    });

	const elements: NormalisedAppointment[] = [];
    appointmentsResult.appointments.forEach((appointment) => {
		if (!appointment.startTime) {
			const obj = {
                type: appointment.type,
                date: "",
                time: "",
                duration: appointment.durationMinutes,
                skill: appointment.skill,
                link: appointment.link,
            };
            elements.push(obj);
		} else {
			const obj = {
                type: appointment.type,
                date: appointment.startTime.toLocaleDateString(),
                time: appointment.startTime.toLocaleTimeString(),
                duration: appointment.durationMinutes,
                skill: appointment.skill,
                link: appointment.link,
            };
            elements.push(obj); 
		}
    });

    return {
        props: {
            messages: notificationsResult.desiredNotifications,
			appointments: elements,
		},
    };
}
