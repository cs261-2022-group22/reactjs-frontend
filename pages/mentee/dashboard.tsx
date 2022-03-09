import { Grid } from "@mui/material";
import Notifications from "components/Notification";
import MenteeLinks from "components/MenteeLinks";
import UpcomingAppointments from "components/UpcomingAppointments";
import { GetSessionParams, getSession } from "next-auth/react";
import { ProfileType } from "utils/proto/account";
import { AccountClient, MeetingClient } from "utils/rpcClients";
import { NormalisedAppointment } from "utils/CommonTypes";

export default function MenteeDashboard(props: { messages: string[]; appointments: NormalisedAppointment[] }) {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "48vh" }}>
                <Grid item xs={6}>
                    <MenteeLinks />
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable={true} appointments={props.appointments}/>
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

	const meetingClient = new MeetingClient();
    const appointmentsResult = await meetingClient.listAppointmentsAsync({
        userid: session["id"] as number,
        profileType: ProfileType.MENTEE,
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
