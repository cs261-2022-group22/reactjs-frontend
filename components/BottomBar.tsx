import { Feedback } from "@mui/icons-material";
import { AppBar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import Link from "next/link";

export default function BottomBar(props: { position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative' }) {
    return (
        <AppBar
            position={props.position}
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
