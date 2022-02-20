import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

function BasicCard({ type, account }) {
    return (
        <Card
            sx={{
                mt: 3,
                boxShadow: 2,
                "&:hover": { boxShadow: 15 },
                height: "82vh",
            }}
        >
            <CardContent
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    mt: "20vh",
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
                    // alignItems: "center",
                    display: "flex",
                }}
            >
                {account == "true" ? (
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

export default BasicCard;
