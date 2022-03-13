import { Card, CardContent, Stack, Typography, List, CardActions, Button } from "@mui/material";
import Link from "next/link";
import { MentorReturn } from "utils/CommonTypes";

export default function Test({mentors}: { mentors: MentorReturn }) {
  

    if (mentors.status == true){

    
    return (
       <>
           <Card
               sx={{
                   mt: "1vh",
                   boxShadow: 2,
                   "&:hover": { boxShadow: 2 },
                   mr: "1vh",
                   maxHeight: "45vh",
                   maxWidth: "100vh",
                   height: "100%",
               }}
           >
               <CardContent>
                   <Stack direction="row" justifyContent="space-between">
                       <Typography
                           variant="h4"
                           sx={{ mb: "-1vh", mt: "1vh" }}
                       >
                           Give Feedback
                       </Typography>
                   </Stack>
                   <List>
                       <Card
                           sx={{
                               overflow: "auto",
                               maxHeight: "50vh",
                               boxShadow: "0",
                               ml: "-1vh",
                               pb: "1vh",
                           }}
                       >
                          
                               
                                   <Card
                                       sx={{
                                           mt: "1vh",
                                           ml: "1vh",
                                           pl: "1vh",
                                           boxShadow: 1,
                                           "&:hover": { boxShadow: 4 },
                                       }}
                                       
                                       
                                   >

                                       <CardActions>
                                    
                                       <Typography
                                            variant ="h6"
                                           sx={{
                                               fontWeight: "bold",
                                               mb: "1vh",
                                               mt: "0.5vh",
                                               pt: "4px",
                                               mr: "2vh",
                                           }}
                                           
                                       >{mentors.mentorName.toString()}
                                
                                       
                                       </Typography>
                                       <Link href="/mentee/MatchingFeedback" passHref>
                                       <Button sx = {{mr: "1vh", ml: "1vh", mt: "1vh", mb:"1vh"}} variant = "contained" size="small" onClick={() => { localStorage.setItem("Mentor_UserID", mentors.mentorUserId), localStorage.setItem("Mentor_Name", mentors.mentorName)}}>Matching Feedback</Button>
                                       </Link>
                                       
                                       </CardActions>
                                      
                                      
                                   </Card>
                               
                           
                       </Card>
                   </List>
               </CardContent>
           </Card>
       </>
   );
}
else{
    return (
    <>
        <Card
            sx={{
                mt: "1vh",
                boxShadow: 2,
                "&:hover": { boxShadow: 2 },
                mr: "1vh",
                maxHeight: "45vh",
                maxWidth: "100vh",
                height: "100%",
            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Typography
                        variant="h4"
                        sx={{ mb: "-1vh", mt: "1vh" }}
                    >
                        Give Feedback
                    </Typography>
                </Stack>
                <List>
                    <Card
                        sx={{
                            overflow: "auto",
                            maxHeight: "50vh",
                            boxShadow: "0",
                            ml: "-1vh",
                            pb: "1vh",
                        }}
                    >
                       
                            
                                <Card
                                    sx={{
                                        mt: "1vh",
                                        ml: "1vh",
                                        pl: "1vh",
                                        boxShadow: 1,
                                        "&:hover": { boxShadow: 4 },
                                    }}
                                    
                                    
                                >

                                    <CardActions>
                                 
                                    <Typography
                                         variant ="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            mb: "1vh",
                                            mt: "0.5vh",
                                            pt: "4px",
                                            mr: "2vh",
                                        }}
                                        
                                    >No Current Mentor
                             
                                    
                                    </Typography>
                                    
                                    
                                    </CardActions>
                                   
                                   
                                </Card>
                            
                        
                    </Card>
                </List>
            </CardContent>
        </Card>
    </>
);
}

}




