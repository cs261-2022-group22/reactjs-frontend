import {
    Button, Card, CardActions, CardContent, List, Stack,
    Typography
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MenteeReturn } from "utils/CommonTypes";
import Unauthenticated from "./Unauthenticated";

export default function Test({ mentees }: { mentees: MenteeReturn[] }) {
    const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }
    let i = 0;
    return (
        <>
            <Card
                sx={{
                    mt: "0vh",
                    boxShadow: 2,
                    "&:hover": { boxShadow: 2 },
                    mr: "1vh",
                    background: "transparent",
                    maxHeight: "45vh",
                    maxWidth: "100vw",
                    height: "100%",
                }}
            >
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5">Give Feedback</Typography>
                    </Stack>
                    <List sx={{ maxHeight: "37vh", overflowY: "scroll", height: "100vh" }}>
                        {mentees.map((mapping) => {
                            return (
                                <Card
                                    sx={{
                                        margin: "1vh",
                                        boxShadow: 1,
                                        "&:hover": { boxShadow: 4 },
                                    }}
                                    key={i++}
                                >
                                    <CardActions>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                mb: "1vh",
                                                mt: "0.5vh",
                                                pt: "4px",
                                                mr: "2vh",
                                            }}
                                        >
                                            {mapping.name}
                                        </Typography>
                                        <Link
                                            href="/mentor/MatchingFeedback"
                                            passHref
                                        >
                                            <Button
                                                sx={{
                                                    mr: "1vh",
                                                    ml: "1vh",
                                                    mt: "1vh",
                                                    mb: "1vh",
                                                }}
                                                variant="contained"
                                                size="small"
                                                onClick={() => {
                                                    localStorage.setItem(
                                                        "Mentee_UserID",
                                                        mapping.userid as unknown as string
                                                    ),
                                                        localStorage.setItem(
                                                            "Mentee_Name",
                                                            mapping.name
                                                        );
                                                }}
                                            >
                                                Matching Feedback
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/mentor/DevelopmentFeedback"
                                            passHref
                                        >
                                            <Button
                                                sx={{
                                                    mr: "1vh",
                                                    ml: "1vh",
                                                    mt: "1vh",
                                                    mb: "1vh",
                                                }}
                                                variant="contained"
                                                size="small"
                                                onClick={() => {
                                                    localStorage.setItem(
                                                        "Mentee_UserID",
                                                        mapping.userid as unknown as string
                                                    ),
                                                        localStorage.setItem(
                                                            "Mentor_UserID",
                                                            session[
                                                            "id"
                                                            ] as unknown as string
                                                        );
                                                    localStorage.setItem(
                                                        "Mentee_Username",
                                                        mapping.name as unknown as string
                                                    );
                                                }}
                                            >
                                                Development Feedback
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        </>
    );
}
