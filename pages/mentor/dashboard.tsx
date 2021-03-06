import { Grid } from "@mui/material";
import MenteeFeedbackList from "components/MentorFeedbackList";
import MentorLinks from "components/MentorLinks";
import Notifications from "components/Notification";
import UpcomingAppointments from "components/UpcomingAppointments";
import { getSession, GetSessionParams } from "next-auth/react";
import { MenteeReturn, NormalisedAppointment } from "utils/CommonTypes";
import { ProfileType } from "utils/proto/account";
import { AccountClient, MatchingClient, MeetingClient } from "utils/rpcClients";

export default function MentorDashboard(props: {
    messages: string[];
    appointments: NormalisedAppointment[];
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
                        appointments={props.appointments}
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

    const accountClient = new AccountClient();
    const notificationsResult = await accountClient.listNotificationsAsync({
        userid: session["id"] as number,
        targetProfileType: ProfileType.MENTOR,
    });
    const client2 = new MatchingClient();
    const menteesResult = await client2.getMenteesByMentorIdAsync({
        mentorUserId: session["id"] as number,
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
            mentees: menteesResult.mentees,
            appointments: elements,
        },
    };
}
