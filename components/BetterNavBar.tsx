import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { signOut } from "next-auth/react";

function BetterNavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                        <Link href="/choice" passHref>
                            <Typography variant="h6">Logo</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link href="/" passHref>
                            <Typography
                                sx={{ textAlign: "center" }}
                                variant="h5"
                            >
                                Website Name
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid container item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }} spacing={2}>
                        <Grid
                            item
                            // sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Link href="/choice" passHref>
                                <Button
                                    color="inherit"
                                    endIcon={<SwitchAccountIcon />}
                                >
                                    Change page
                                </Button>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            // sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Link href="/tutorial" passHref>
                                <Button color="inherit" endIcon={<HelpIcon />}>
                                    Help
                                </Button>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            // sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <a onClick={() => signOut()}>
                                <Button
                                    color="inherit"
                                    endIcon={<LogoutIcon />}
                                >
                                    Log out
                                </Button>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default BetterNavBar;
