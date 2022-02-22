import { Grid, Container } from "@mui/material";
import BottomBar from "components/BottomBar";
import BasicCard from "../components/BasicCard";
import { useSession } from "next-auth/react";
// import axios from "axios";
import Unauthenticated from "components/Unauthenticated";
import { credentials } from "@grpc/grpc-js";
import { promisify } from "util";
import {
    AccountServiceClient,
    ProfilesRequest,
    ProfilesReply,
} from "utils/proto/account";


async function Home() {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return "Loading..."
	}
	if (!session) {
		return <Unauthenticated/>
	}
	// const res = await axios.post("http://localhost:3000/api/user/profileType", {
	// 	userid: session['id'],
    // });
	// console.log(res.data)

	const client = new AccountServiceClient(
        "127.0.0.1:50051",
        credentials.createInsecure()
    );
    const profileAsync = promisify<ProfilesRequest, ProfilesReply>(
        client.accountProfiles
    ).bind(client);
    const profileResult = await profileAsync({
        userid: Number(session['id'])
    });
    console.log(profileResult);
	console.log(profileResult.isMentee);
	console.log(profileResult.isMentor);

    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentee" account="true" />
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentor" account="false" />
                    </Container>
                </Grid>
            </Grid>
            <BottomBar position="fixed" />
        </>
    );
}

export default Home;
