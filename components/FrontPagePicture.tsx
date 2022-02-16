import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

function FrontPagePicture() {
  return (
    <Card sx={{ maxWidth: 1000, maxHeight: 1000, mt: 5, mb: 5 }}>
      <CardActionArea style={{ justifyContent: "center", alignItems: "center",display: "flex" }}>
        <CardMedia  sx={{maxWidth: 1000, maxHeight: 1000}}
          component="img"
          image="/Images/Mentor.jpg"
          
          alt="Mentor"
        />

      </CardActionArea>
    </Card>
  );
}
export default FrontPagePicture
