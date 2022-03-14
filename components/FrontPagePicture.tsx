import { Card, CardMedia } from "@mui/material";

export default function FrontPagePicture() {
    return (
        <Card sx={{ mt: "5vh", boxShadow: 0 }}>
            <CardMedia
                sx={{ maxWidth: "50vw", maxHeight: "50vh" }}
                component="img"
                image="/Images/Mentor.png"
                alt="Mentor"
            />
        </Card>
    );
}
