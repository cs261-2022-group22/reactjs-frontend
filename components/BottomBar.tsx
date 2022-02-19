import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import { Feedback } from "@mui/icons-material";
import Link from "next/link";

function BottomBar(props) {
    return (
        <AppBar
            position={ props.position }
            color="primary"
            style={{ top: "auto", bottom: 0 }}
        >
            <BottomNavigation>
                <Link href="/developerFeedback" passHref>
                    <BottomNavigationAction
                        label="Feedback"
                        icon={<Feedback />}
                        showLabel
                        sx={{ "&:hover": { color: "#5d6166" } }}
                    />
                </Link>
            </BottomNavigation>
        </AppBar>
    );
}

export default BottomBar;
