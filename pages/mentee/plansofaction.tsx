import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, List, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import PlanElement, { PoAData } from "components/PlanElement";
import Unauthenticated from "components/Unauthenticated";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { useState } from "react";
import { PlansOfAction } from "utils/proto/meeting";
import { MeetingClient } from "utils/rpcClients";

// const test_data = [[1, "Wake up", true], [1, "Eat breakfast", true], [2, "Shower", false]];

export default function plansofaction(props: { valid: boolean, poas: PlansOfAction[] }) {
    const [userInput, setUserInput] = useState("");

    const poaData: PoAData[] = [];
    for (let i = 0; i < props.poas.length; i++) {
        const poa: PlansOfAction = props.poas[i];
        poaData.push({ id: poa.id, content: poa.content, completed: false });
    }
    const [elements, setElements] = useState(poaData);
    const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />
    }


    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Stack>
                    <Typography sx={{ mt: "5vh", mb: "5vh" }} variant="h3">
                        Your plan of action
                    </Typography>
                    <TextField
                        sx={{
                            mb: "2vh",
                        }}
                        label="Enter your milestones:"
                        onChange={(e) => {
                            setUserInput(e.target.value);
                        }}
                    />
                    <Grid container justifyContent="center">
                        <Button
                            variant="contained"
                            endIcon={<AddIcon />}
                            sx={{
                                minWidth: "11vh",
                                mb: "8vh",
                            }}
                            onClick={async () => {
                                if (userInput.length > 0) {
                                    const res = await axios.post(
                                        "/api/user/createpoa",
                                        {
                                            userid: session["id"] as number,
                                            plansOfAction: userInput as string,
                                        }
                                    );
                                    if (res.data.successful) {
                                        setElements([...elements, {
                                            id: res.data.plan?.id ?? -1,
                                            content: res.data.plan?.content ?? "<Error>",
                                            completed: false
                                        }])
                                    }
                                }
                            }}
                        >
                            Add
                        </Button>
                    </Grid>
                    <List
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {elements.map((element) => {
                            return (
                                <PlanElement element={element} key={element.id} />
                            );
                        })}
                    </List>
                </Stack>
            </Container>
        </>
    );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {
                valid: false,
            }
        }
    }

    const meetingClient = new MeetingClient();
    const poaResult = await meetingClient.listPlansOfActionAsync({
        userid: session["id"] as number,
    });

    return {
        props: {
            valid: true,
            poas: poaResult.plansOfActions,
        },
    };
}
