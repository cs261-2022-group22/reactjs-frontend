import { Typography, Button } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";

export default function LoginButton() {
    return (
        <Link href="/api/auth/signin" passHref>
            <Button
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}>
                <Typography variant="h5">Login</Typography>
            </Button>
        </Link>
    );
}
