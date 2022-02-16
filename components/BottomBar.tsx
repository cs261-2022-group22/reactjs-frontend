import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Link from "next/link";

function BottomBar() {
    return (
        <AppBar
            position="fixed"
            color="primary"
            style={{ top: "auto", bottom: 0 }}
        >
            <BottomNavigation>
                <Link href="/developerFeedback" passHref>
                    <BottomNavigationAction
                        label="Feedback"
                        icon={<FeedbackIcon />}
                        showLabel
                        sx={{ "&:hover": { color: "#5d6166" } }}
                    />
                </Link>
            </BottomNavigation>
        </AppBar>
    );
}

export default BottomBar;
