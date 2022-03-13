import { Card, CardMedia } from "@mui/material";

export default function FrontPagePicture() {
    return (
        <Card
            sx={{
				minWidth: "110vh",
				minHeight: "110vh",
                maxWidth: "110vh",
                maxHeight: "110vh",
                mt: "5vh",
                boxShadow: 0,
            }}
        >
            <CardMedia
                sx={{ maxWidth: "110vh", maxHeight: "110vh" }}
                component="img"
                image="/Images/Mentor.png"
                alt="Mentor"
            />
        </Card>
    );
}
