import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function BasicCard({ type, account, marginLeft, marginRight }: { type: string, account: boolean, marginLeft: string, marginRight: string }) {
    return (
        <Card
            sx={{
                mt: "3vh",
                boxShadow: 2,
                "&:hover": { boxShadow: 15 },
                height: "82vh",
                ml: marginLeft,
                mr: marginRight,
                mb: "1vh"
            }}
        >
            <CardContent
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    mt: "22vh",
                }}
            >
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h1">{type}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                {account ? (
                    <Link href={type + "/dashboard"} passHref>
                        <Button size="large">Go to dashboard</Button>
                    </Link>
                ) : (
                    <Link href={type + "/signup"} passHref>
                        <Button size="large">Sign up</Button>
                    </Link>
                )}
            </CardActions>
        </Card>
    );
}
