import { AddBox as AddBoxIcon, Assignment as AssignmentIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import Link from "next/link";

export default function MenteeLinks() {
    return (
        <Grid container rowSpacing={5} sx={{ textAlign: "center", mt: 1, p: 1 }}>
            <Grid item xs={6}>
                <Link href="/mentee/schedule" passHref>
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
