import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

function FrontPagePicture() {
    return (
        <Card sx={{ maxWidth: "110vh", maxHeight: "110vh", mt: "5vh", mb: "3vh" }}>
            <CardActionArea
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <CardMedia
                    sx={{ maxWidth: "110vh", maxHeight: "110vh" }}
                    component="img"
                    image="/Images/Mentor.jpg"
                    alt="Mentor"
                />
            </CardActionArea>
        </Card>
    );
}
export default FrontPagePicture;
