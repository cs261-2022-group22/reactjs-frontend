import { Typography, Button } from "@mui/material";
import Link from "next/link";

function LoginButton() {
    return (
        <Link href="/api/auth/signin" passHref>
            <Button
                variant="contained"
                size="medium"
            >
                <Typography variant="h4"> Login</Typography>
            </Button>
        </Link>
    );
}
export default LoginButton;
