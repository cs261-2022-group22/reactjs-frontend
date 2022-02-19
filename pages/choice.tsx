import { Grid, Container } from "@mui/material";
import NavBar from "components/NavBar";
import BottomBar from "components/BottomBar";
import BasicCard from "../components/BasicCard";

function Home() {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard />
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container>
                        <BasicCard />
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
