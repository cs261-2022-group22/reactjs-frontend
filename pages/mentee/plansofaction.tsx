import {
    Container,
    Stack,
    TextField,
    Typography,
	Button,
    List,
    Card,
	Grid,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const test_data = ["Wake up", "Eat breakfast", "Shower"];

export default function planofactions() {
    const [userInput, setUserInput] = useState("");
	const [elements, setElements] = useState(test_data)

    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Stack>
                    <Typography variant="h3">Your plan of action</Typography>
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
                            }}
                            onClick={() => {
                                setElements([...elements, userInput]);
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
                                <Card
                                    sx={{
                                        mb: "2vh",
                                        pl: "2vh",
                                        height: "6vh",
                                        boxShadow: 1,
                                        "&:hover": { boxShadow: 3 },
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                    key={element}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {element}
                                    </Typography>
                                </Card>
                            );
                        })}
                    </List>
                </Stack>
                {userInput}
            </Container>
        </>
    );
}
