import { Grid, Container } from "@mui/material";
import BottomBar from "components/BottomBar";
import BasicCard from "../components/BasicCard";

function Home() {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentee" account="false" />
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard type="mentor" account="true" />
                    </Container>
                </Grid>
            </Grid>
            <BottomBar position="fixed" />
        </>
    );
}

export default Home;
