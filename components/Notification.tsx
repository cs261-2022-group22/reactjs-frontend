import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Notifications({ messages }: { messages: string[] }) {
    if (!messages.length) {
        return (
            <Card
                sx={{
                    border: 3,
                    borderColor: "info.main",
                    borderRadius: 15,
                    margin: 1,
                    boxShadow: 3,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        typography: "h3",
                    }}
                >
                    Your notifications
                    <List>
                        <ListItemText>
                            <Typography variant="h5">
                                No notifications
                            </Typography>
                        </ListItemText>
                    </List>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card
            sx={{
                border: 3,
                borderColor: "info.main",
                borderRadius: 15,
                margin: 1,
                boxShadow: 3,
            }}
        >
            <CardContent
                sx={{
                    textAlign: "center",
                    typography: "h3",
                }}
            >
                Your notifications
                <List>
                    {messages.map((message) => {
                        return (
                            <ListItem key={message}>
                                <ListItemText
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h6">
                                        {message}
                                    </Typography>
                                    .
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
}
