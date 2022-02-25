import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

function FrontPagePicture() {
    return (
        <Card
            sx={{
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
export default FrontPagePicture;
