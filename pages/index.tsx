import { Button, Grid } from "@mui/material";
import LoginButton from "components/LoginButton";
import FrontPagePicture from "components/FrontPagePicture";
import RegisterButton from "components/RegisterButton";
import FrontPageText from "components/FrontPageText";
import BottomBar from "components/BottomBar";
import { signIn } from "next-auth/react";

export default function Home() {
    return (
        <>
            <Grid
                container
                spacing={5}
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Grid
                    item
                    style={{ justifyContent: "center", display: "flex" }}
                    xs={11}
                >
                    <FrontPagePicture />
                </Grid>
                <Grid
                    item
                    style={{ justifyContent: "right", display: "flex" }}
                    xs={6}
                >
                    <LoginButton />
                </Grid>
                <Grid
                    item
                    style={{ justifyContent: "left", display: "flex" }}
                    xs={6}
                >
                    <RegisterButton />
                </Grid>
                <Grid
                    item
                    style={{ justifyContent: "center", display: "flex" }}
                    xs={10}
                >
                    <FrontPageText />
                </Grid>
            </Grid>
            <BottomBar position="relative" />
        </>
    );
}
