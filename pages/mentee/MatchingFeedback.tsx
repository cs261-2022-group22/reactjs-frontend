import { Typography, Button, Rating, Box, Container, Alert } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { getSession, GetSessionParams } from "next-auth/react";
import axios from "axios";


export default function MentorFeedback(props: {mid: string}) {

    const [status, setStatus] = useState("normal");


    
    const [value, setValue] = React.useState<number | null>(2);
    if (status == "normal"){
    return 	(
    <>

    <Box
        sx={{
            '& > legend': { mt: 3, ml: 2 },
           
        }}
        >
        <Typography sx={{fontweight: "bold"}} variant="h3" component="legend">How Good Was The Match?</Typography>
        <Typography variant="h3" component="legend">Mentor's Name: { localStorage.getItem('Mentor_Name')  }</Typography>
        <Rating
            sx={{
                fontSize: "5.5rem",
                mt:"2vh",
                mb:"2vh",
                ml: 2
            }}
            name="Feed"
            size="large"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />
    </Box>

    
            <Button
                sx={{ mt: 2, ml: 2 }}
                variant="contained"
                size="large"
                onClick={async () => {
                    //console.log(props.mentorsid)
  
                    
                   
                    const res = await axios.post(
                        "/api/user/MentorFeedback",
                        {
                            menteeUserId: props.mid as unknown as number,
                            mentorUserId: parseInt(localStorage.getItem('Mentor_UserID')),
                            rating: value
                            
                        }
                    );
            
                    if (res.data.success) {
                        setStatus("success");
                    } else {
                        setStatus("false");
                    }
                    
                }} 
            >
                <Typography variant="h3"> Submit</Typography>
                
            </Button>
    <Link href="/mentee/dashboard">
            <Button
                sx={{ mt: 2, ml: 10 }}
                variant="contained"
                size="large"
                
            >
                <Typography variant="h3"> Return to dashboard</Typography>
                
            </Button>
    </Link>
    </>
    )
            }
    else if (status=="false"){
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="warning" sx={{ mt: "3vh", mb: "3vh" }}>
                    Error, feedback already given
                </Alert>
                <Link href="/mentee/dashboard">
                    <Button
                        variant="contained"
                        size="large"
                        
                    >
                        Return To Dashboard
                    </Button>
                </Link>
            </Container>
        );}
        else {
            return (
                <Container sx={{ textAlign: "center" }}>
                    <Alert severity="info" sx={{ mt: "3vh", mb: "3vh" }}>
                        Feedback Recorded successfully
                    </Alert>
                    <Link href="/mentee/dashboard">
                        <Button
                            variant="contained"
                            size="large"
                        >
                            Go to dashboard
                        </Button>
                    </Link>
                </Container>
            );
        }
    
    }



    


export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {
               mid: "",

            }
        };
    }

    //localStorage.setItem('mid', session["id"] as string)}}
   
    
        

    
    return {
        props: {
            mid: session["id"] as string
            
            
        },
    };
}