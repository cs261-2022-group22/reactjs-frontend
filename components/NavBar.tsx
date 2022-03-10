import { Help as HelpIcon, Logout as LogoutIcon, SwitchAccount as SwitchAccountIcon, School as SchoolIcon } from "@mui/icons-material";
import { AppBar, Button, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    const { data: session } = useSession();
    if (session) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Link href="/" passHref>
                                <IconButton color="inherit">
                                    <SchoolIcon />
                                </IconButton>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography
                                sx={{ textAlign: "center", mt: "4px" }}
                                variant="h5"
                            >
                                MentorBank
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={4}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                            spacing={2}
                        >
                            <Grid item>
                                <Link href="/choice" passHref>
                                    <Button
                                        color="inherit"
                                        endIcon={<SwitchAccountIcon />}
                                    >
                                        Change page
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/tutorial" passHref>
                                    <Button
                                        color="inherit"
                                        endIcon={<HelpIcon />}
                                    >
                                        Help
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <a
                                    onClick={() =>
                                        signOut({
                                            callbackUrl: "/",
                                        })
                                    }
                                >
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
    } else {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid
                            item
                            xs={2}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Link href="/" passHref>
                                <IconButton
                                    color="inherit"
                                >
									<SchoolIcon/>
								</IconButton>
                            </Link>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                sx={{ textAlign: "center", mt: "4px" }}
                                variant="h5"
                            >
                                MentorBank
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
}
