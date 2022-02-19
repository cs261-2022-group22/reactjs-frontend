import React from 'react'
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import HelpIcon from "@mui/icons-material/Help";

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid
                        item
                        xs={2}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                        <Link href="/" passHref>
                            <Typography variant="h6">Logo</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{ textAlign: "center" }} variant="h5">
                            Website Name
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Link href="/tutorial" passHref>
                            <Button color="inherit" endIcon={<HelpIcon />}>
                                Help
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
