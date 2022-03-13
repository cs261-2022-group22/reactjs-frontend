import {
    Container,
    Button,
    TextField,
    Typography,
    Alert,
    Stack,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import Unauthenticated from "components/Unauthenticated";
import { useSession } from "next-auth/react";

export default function DevelopmentFeedback() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("normal");

	const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }


    if (status == "normal") {
        return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Typography sx={{ mt: "5vh", mb: "1vh" }} variant="h3">
                        Development Feedback
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
                                if (message.length > 0) {
                                    let a =
                                        localStorage.getItem("Mentee_UserID");
                                    if (a == null) {
                                        a = "-1";
                                    }

                                    let b =
                                        localStorage.getItem("Mentor_UserID");
                                    if (b == null) {
                                        b = "-1";
                                    }
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
                                        setStatus("false");
                                    }
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
                        Feedback Recorded successfully
                    </Alert>
                    <Link href="/mentor/dashboard" passHref>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ArrowForwardIcon />}
                        >
                            Go to dashboard
                        </Button>
                    </Link>
                </Container>
            </>
        );
    }
}
