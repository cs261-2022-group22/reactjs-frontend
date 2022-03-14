import { Card, List, Typography } from "@mui/material";

export default function Notifications({ messages }: { messages: string[] }) {
    if (!messages.length) {
        return (
            <Card
                sx={{
                    mb: "1vh",
                    boxShadow: 2,
                    "&:hover": { boxShadow: 2 },
                    ml: "1vh",
                    background: "transparent",
                    padding: "1vh",
                    maxHeight: "45vh",
                    maxWidth: "49vw",
                    height: "100%",
                }}
            >
                <Typography variant="h5">Your notifications</Typography>
                <Typography sx={{ typography: "h5", margin: 5, fontStyle: 'italic' }}>
                    There are no notifications now.
                </Typography>
            </Card >
        );
    }
    return (
        <Card
            sx={{
                mb: "1vh",
                boxShadow: 2,
                "&:hover": { boxShadow: 2 },
                ml: "1vh",
                background: "transparent",
                padding: "1vh",
                maxHeight: "45vh",
                maxWidth: "100vw",
                height: "100%",
            }}
        >
            <Typography variant="h5">Your notifications</Typography>
            <List>
                <Card
                    sx={{
                        background: "transparent",
                        overflow: "auto",
                        maxHeight: "37vh",
                        boxShadow: "0",
                    }}
                >
                    {messages.map((message) => {
                        return (
                            <Card
                                sx={{
                                    margin: "1vh",
                                    padding: "1vh",
                                    boxShadow: 1,
                                    "&:hover": { boxShadow: 4 },
                                }}
                                key={message}
                            >
                                <Typography>
                                    {message}
                                </Typography>
                            </Card>
                        );
                    })}
                </Card>
            </List>
        </Card>
    );
}
