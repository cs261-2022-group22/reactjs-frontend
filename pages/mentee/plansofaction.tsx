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

const test_data = [["Wake up", true], ["Eat breakfast", true], ["Shower", false]];

export default function planofactions() {
    const [userInput, setUserInput] = useState("");
	const [elements, setElements] = useState(test_data)

    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Stack>
                    <Typography sx={{ mt: "5vh", mb: "5vh"}} variant="h3">Your plan of action</Typography>
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
								mb: "8vh"
                            }}
                            onClick={() => {
                                setElements([...elements, [userInput, false]]);
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
                            return (<PlanElement element={element} key={element}/>);
                        })}
                    </List>
                </Stack>
            </Container>
        </>
    );
}
