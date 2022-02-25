import { Typography, Button } from "@mui/material";
import Link from "next/link";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function RegisterButton() {
    return (
        <Link href="/user/register" passHref>
            <Button
                variant="contained"
                size="medium"
				endIcon={<AppRegistrationIcon/>}
            >
                <Typography variant="h4">Register</Typography>
            </Button>
        </Link>
    );
}
export default RegisterButton;
