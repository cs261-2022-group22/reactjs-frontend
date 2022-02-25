import { Typography, Button } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";

function LoginButton() {
    return (
        <Link href="/api/auth/signin" passHref>
            <Button
                variant="contained"
                size="medium"
				endIcon={<LoginIcon/>}
            >
                <Typography variant="h4"> Login</Typography>
            </Button>
        </Link>
    );
}
export default LoginButton;
