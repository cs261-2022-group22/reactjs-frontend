// TODO uncomment comments when testing sessions
import { Grid, Container } from "@mui/material";
import BottomBar from "components/BottomBar";
import BasicCard from "../components/BasicCard";
// import Unauthenticated from "components/Unauthenticated";
// import { getSession, useSession } from "next-auth/react";
import axios from "axios";

function Choice(props: { valid: boolean; isMentee: boolean; isMentor: boolean }) {
    // if (!props.valid) {
    //     return <Unauthenticated />;
    // }
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

export default Choice;

export async function getServerSideProps() {
    // export async function getServerSideProps(context) {
    // const session = await getSession(context);
    // if (session) {
    const res = await axios.post("http://localhost:3000/api/user/profiletype", {
        userid: "1", //session["id"],
    });
    return {
        props: {
            valid: true,
            isMentee: res.data.isMentee,
            isMentor: res.data.isMentor,
        },
    };
    // }
    // return {
    // 	props: {
    // 		valid: false
    // 	}
    // }
}
