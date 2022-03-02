import { Grid } from "@mui/material";
import MenteeLinks from  "components/MenteeLinks";

function MenteeDashboard() {
    return (
        <>
            <Grid container>
                <Grid container item xs={12} sx={{ height: "48vh"}}>
                    <Grid item xs={6}>
                        <MenteeLinks/>
                    </Grid>
                    <Grid item xs={6}>
                        Top right
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        Bottom left
                    </Grid>
                    <Grid item xs={6}>
                        Bottom right
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default MenteeDashboard;
