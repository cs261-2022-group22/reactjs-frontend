import { Grid } from "@mui/material";

export default function MenteeDashboard() {
    return (
        <Grid container>
            <Grid container item xs={12} sx={{ height: "46vh" }}>
                <Grid item xs={6}>
                    Top left
                </Grid>
                <Grid item xs={6}>
                    Top right
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
