import { Button, Grid, Typography } from '@mui/material';
import Link from "next/link";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';

function Links() {
    return (
        <Grid container rowSpacing={5} sx={{ textAlign: "center", mt: 1, p: 1 }}>
            <Grid item xs={6}>           
                <Link href="/mentee/meeting" passHref>
                    <Button 
                        sx={{ 
                            flexDirection: 'column', 
                            height: 100,
                            width: 150
                        }}>
                        <AddBoxIcon />
                        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                            Schedule a meeting
                        </Typography>
                    </Button> 
                </Link>              
            </Grid>
            <Grid item xs={6}>
                <Link href="/mentee/planofactions" passHref>
                        <Button 
                            sx={{ 
                                flexDirection: 'column', 
                                height: 100,
                                width: 150
                            }}>
                            <AssignmentIcon />
                            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                                Plan of Actions
                            </Typography>
                        </Button>                        
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link href="/mentee/details" passHref>
                    <Button 
                        sx={{ 
                            flexDirection: 'column', 
                            height: 100,
                            width: 150
                        }}>
                        <SettingsIcon />
                        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                            Change details
                        </Typography>
                    </Button>  
                </Link> 
            </Grid>
        </Grid>
        
    );
}
export default Links;
