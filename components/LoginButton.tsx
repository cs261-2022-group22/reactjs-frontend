import { Typography, Button } from "@mui/material";
import Link from "next/link";

function LoginButton() {
    return (
        <Link href="/api/auth/signin" passHref>
            <Button
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
            >
                <Typography variant="h3"> Login</Typography>
            </Button>
        </Link>
    );
}
export default LoginButton;
