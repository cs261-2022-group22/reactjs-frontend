import { Grid } from "@mui/material";
import MenteeLinks from  "components/MenteeLinks";
import UpcomingAppointments from "components/UpcomingAppointments";

export default function MenteeDashboard() {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "48vh"}}>
                <Grid item xs={6}>
                    <MenteeLinks/>
                </Grid>
                <Grid item xs={6}>
                    <UpcomingAppointments cancellable={true}/>
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
