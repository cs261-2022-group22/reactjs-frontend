import { Typography, Button } from "@mui/material";
import Link from "next/link";

function RegisterButton() {
    return (
        <Link href="/user/register" passHref>
            <Button
                variant="contained"
                size="medium"
            >
                <Typography variant="h4">Register</Typography>
            </Button>
        </Link>
    );
}
export default RegisterButton;
