import {
    Container,
    Button,
    TextField,
    Typography,
    Alert,
    Link,
    Stack,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function DevelopmentFeedback() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("normal");

    const a = localStorage.getItem("Mentee_UserID");
    if (a == null) {
        setStatus("false");
    }

    const b = localStorage.getItem("Mentor_UserID");
    if (b == null) {
        setStatus("false");
    }

    if (status == "normal") {
        return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Typography sx={{ mt: "5vh", mb: "1vh" }} variant="h3">
                        {"Development Feedback for " +
                            localStorage.getItem("Mentee_Username")}
                    </Typography>
                    <TextField
                        label="Feedback"
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
                                const res = await axios.post(
                                    "/api/user/developmentfeedback",
                                    {
                                        mentorUserId: b,
                                        menteeUserId: a,
                                        message: message,
                                    }
                                );
                                if (res.data.success) {
                                    setStatus("success");
                                } else {
									setStatus("false")
								}
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Container>
            </>
        );
    } else if (status == "false") {
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="warning" sx={{ mt: "3vh", mb: "3vh" }}>
                    An error has occurred, please try again
                </Alert>
                <Link href="/mentee/DevelopmentFeedback">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<RefreshIcon />}
                    >
                        Try again
                    </Button>
                </Link>
            </Container>
        );
    } else {
        return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Alert severity="info" sx={{ mt: "3vh", mb: "3vh" }}>
                        Thank you for the feedback
                    </Alert>
                    <Link href="/">
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
