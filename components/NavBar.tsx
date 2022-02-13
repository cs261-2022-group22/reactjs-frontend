import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import HelpIcon from "@mui/icons-material/Help";

function NavBar() {
    return (
        <AppBar position="static">
			<Box sx={{ flexGrow: 1 }}>
				<Toolbar>
					<Typography variant="h6">Logo</Typography>
					<Typography sx={{ flexGrow: 1, textAlign: "center" }} variant="h5">
						Website Name
					</Typography>
					<Link href="/tutorial">
						<Button color="inherit" endIcon={<HelpIcon/>}>Help</Button>						
					</Link>
				</Toolbar>
			</Box>
        </AppBar>
    );
}

export default NavBar;
