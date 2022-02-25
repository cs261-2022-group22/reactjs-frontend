import { Typography, Button } from "@mui/material";
import Link from "next/link";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export default function RegisterButton() {
    return (
        <Link href="/user/register" passHref>
            <Button
                variant="contained"
                size="large"
                startIcon={<AppRegistrationIcon />}>
                <Typography variant="h5">Register</Typography>
            </Button>
        </Link>
    );
}
