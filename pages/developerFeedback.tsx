import { Container, Button, TextField, Typography, Alert, Stack } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function developerFeedback() {
	const [message, setMessage] = useState("")
	const [status, setStatus] = useState("normal")

	if (status == "normal") {
		return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Typography sx={{ mt: "5vh", mb: "1vh" }} variant="h3">
                        Help us with feedback
                    </Typography>
                    <TextField
                        label="Developer Feedback"
                        color="secondary"
                        focused
                        sx={{
                            minWidth: "120vh",
                            maxWidth: "120vh",
                            mt: "5vh",
                            mb: "10vh",
                        }}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            variant="contained"
                            onClick={async () => {
                                await axios.post("/api/user/devfeedback", {
                                    message: message,
                                });
                                setStatus("success");
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                </Container>
            </>
        );
	} else {
		return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Alert severity="info" sx={{ mt: "3vh", mb: "3vh" }}>
                        Thank you for the feedback
                    </Alert>
                    <Link href="/" passHref>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ArrowForwardIcon />}
                        >
                            Go to home page
                        </Button>
                    </Link>
                </Container>
            </>
        );
	}
}
