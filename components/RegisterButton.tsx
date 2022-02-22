import { Typography, Button } from "@mui/material";
import Link from "next/link";

function RegisterButton() {
    return (
        <Link href="/user/register" passHref>
            <Button
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
                href="/user/register"
            >
                <Typography variant="h3">Register</Typography>
            </Button>
        </Link>
    );
}
export default RegisterButton;
