import { Grid } from "@mui/material";
import UpcomingAppointments from "components/UpcomingAppointments";

function MentorDashboard() {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    Top left
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable="false"/>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    Bottom left
                </Grid>
                <Grid item xs={6}>
                    Bottom right
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MentorDashboard;
