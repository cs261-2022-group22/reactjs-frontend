import { Card, CardContent, List, Typography } from "@mui/material";

export default function Notifications({ messages }: { messages: string[] }) {
    if (!messages.length) {
        return (
            <Card
                sx={{
                    mb: "1vh",
                    boxShadow: 2,
                    "&:hover": { boxShadow: 2 },
                    ml: "1vh",
                    maxHeight: "45vh",
                    maxWidth: "100vh",
                    height: "100%",
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        typography: "h4",
                    }}
                >
                    Your notifications
                        <Typography
                            sx={{
                                typography: "h5",
                                margin: 5,
                                fontStyle: 'italic'
                            }}
                        >
                                No notifications
                        </Typography>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card
            sx={{
                mb: "1vh",
                boxShadow: 2,
                "&:hover": { boxShadow: 2 },
                ml: "1vh",
                maxHeight: "45vh",
                maxWidth: "100vh",
                height: "100%",
            }}
        >
            <CardContent
                sx={{
                    textAlign: "center",
                    typography: "h4",
                }}
            >
                Your notifications
                <List>
                    <Card
                        sx={{
                            overflow: "auto",
                            maxHeight: "30vh",
                            boxShadow: "0",
                            ml: "-1vh",
                            pb: "1vh",
                        }}
                    >
                        {messages.map((message) => {
                            return (
                                <Card
                                    sx={{
                                        textAlign: "center",
                                        mt: "1vh",
                                        ml: "1vh",
                                        pl: "1vh",
                                        boxShadow: 1,
                                        "&:hover": { boxShadow: 4 },
                                    }}
                                    key = {message}
                                >
                                    <Typography variant="h6">
                                        {message}
                                    </Typography>
                                </Card>
                            );
                        })}
                    </Card>
                </List>
            </CardContent>
        </Card>
    );
}
