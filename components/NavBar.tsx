import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import HelpIcon from "@mui/icons-material/Help";

function NavBar() {
    return (
        <AppBar position="static">
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>
                    <Grid container spacing={12}>
                        <Grid item xs={2}>
                            <Typography variant="h6">Logo</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                sx={{ flexGrow: 1, textAlign: "center" }}
                                variant="h5"
                            >
                                Website Name
                            </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={1}>
                            <Link href="/tutorial">
                                <Button color="inherit" endIcon={<HelpIcon />}>
                                    Help
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
        </AppBar>
    );
}

export default NavBar;
