import {
    Container,
    Stack,
    TextField,
    Typography,
	Button,
    List,
	Grid,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PlanElement from "components/PlanElement"
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { MeetingClient } from "utils/rpcClients";
import { PlansOfAction } from "utils/proto/meeting";
import axios from "axios";
import Unauthenticated from "components/Unauthenticated";

// const test_data = [[1, "Wake up", true], [1, "Eat breakfast", true], [2, "Shower", false]];

export default function plansofaction(props: { valid: boolean, poas: PlansOfAction[] }) {
	const [userInput, setUserInput] = useState("");
	const poaData = [];
    for (let i = 0; i < props.poas.length; i++) {
        const poa = props.poas[i];
        poaData.push([poa.id, poa.content, false]);
    }
    const [elements, setElements] = useState(poaData);
	const { data: session } = useSession();
	if (!session) {
		return <Unauthenticated/>
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
								console.log("clicked")
								if (userInput.length > 0) {
									console.log("longer than 0")
									const res = await axios.post(
                                        "/api/user/createpoa",
                                        {
                                            userid: session["id"] as number,
                                            plansOfAction: userInput as string,
                                        }
                                    );
									console.log(res.data);
                                    if (res.data.successful) {
                                        setElements([...elements, [res.data.plan.id, res.data.plan.content, false]])
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
                                <PlanElement element={element} key={element} />
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
