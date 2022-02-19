import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";

function BasicCard() {
    return (
        <Card sx={{ mt: 3, "&:hover": { boxShadow: 5 }, height: "82vh" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>Word of the Day</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default BasicCard;
