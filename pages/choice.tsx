import { Container, Grid } from "@mui/material";
import BasicCard from "components/BasicCard";
import BottomBar from "components/BottomBar";
import Unauthenticated from "components/Unauthenticated";
import { getSession } from "next-auth/react";
import { AccountClient } from "utils/rpcClients";

export default async function Choice(props: { isMentee: boolean; isMentor: boolean }) {
    const session = await getSession();
    if (!session) {
        return <Unauthenticated />;
    }

    console.log(props)
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentee" account={props.isMentee} marginLeft="0vh" marginRight="-1vh" />
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentor" account={props.isMentor} marginLeft="-1vh" marginRight="0" />
                    </Container>
                </Grid>
            </Grid>
            <BottomBar position="fixed" />
        </>
    );
}

export async function getServerSideProps() {
    const session = await getSession();

    if (!session) {
        return {
            props: {
                isMentee: false,
                isMentor: false,
            },
        };
    }

    const client = new AccountClient();
    const profileResult = await client.listAccountProfilesAsync({
        userid: session['id'] as number
    });

    return {
        props: {
            valid: true,
            isMentee: profileResult.isMentee,
            isMentor: profileResult.isMentor,
        },
    };
}
