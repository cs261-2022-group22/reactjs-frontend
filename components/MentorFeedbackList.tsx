import {
    Card,
    CardContent,
    Stack,
    Typography,
    List,
    CardActions,
    Button,
} from "@mui/material";
import Link from "next/link";
import { MenteeReturn } from "utils/CommonTypes";

export default function Test({ mentees }: { mentees: MenteeReturn[] }) {
    let i = 0;
    return (
        <>
            <Card
                sx={{
                    mt: "0vh",
                    boxShadow: 2,
                    "&:hover": { boxShadow: 2 },
                    mr: "1vh",
                    maxHeight: "45vh",
                    maxWidth: "100vh",
                    height: "100%",
                }}
            >
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h4" sx={{ mb: "-1vh", mt: "1vh" }}>
                            Give Feedback
                        </Typography>
                    </Stack>
                    <List sx={{ maxHeight: "37vh", overflowY: "scroll" }}>
                        <Card
                            sx={{
                                overflow: "auto",
                                maxHeight: "50vh",
                                boxShadow: "0",
                                ml: "-1vh",
                                pb: "1vh",
                            }}
                        >
                            {mentees.map((mapping) => {
                                return (
                                    <Card
                                        sx={{
                                            mt: "1vh",
                                            ml: "1vh",
                                            pl: "1vh",
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
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </Card>
                    </List>
                </CardContent>
            </Card>
        </>
    );
}
