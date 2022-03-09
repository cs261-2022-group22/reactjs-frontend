import { Button, Container, Typography } from "@mui/material";

export default function Unauthenticated() {
    return (
        <Container maxWidth="sm" sx={{ paddingTop: 15 }}>
            <Typography variant="h3" align="center" color={"#ff4b4e"}>Access Denied</Typography>
            <br />
            <br />
            <Typography variant="h6" align="center" color={"#ff4b4e"}>Please sign in to access the page.</Typography>
            <br />
            <br />
            <br />
            <Button href="/api/auth/signin" variant="outlined" sx={{ padding: 1, display: 'flex' }}>
                Sign In
            </Button>
        </Container >
    );
}
