import { AddBox as AddBoxIcon, ArrowBack as ArrowBackIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import Link from "next/link";

export default function MentorLinks() {
    return (
        <Grid container rowSpacing={5} sx={{ textAlign: "center", mt: 1, p: 1 }}>
            <Grid item xs={6}>
                <Link href="/choice" passHref>
                    <Button
                        sx={{
                            flexDirection: 'column',
                            height: 100,
                            width: 150
                        }}>
                        <ArrowBackIcon />
                        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                            Go back
                        </Typography>
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link href="/mentor/workshop" passHref>
                    <Button
                        sx={{
                            flexDirection: 'column',
                            height: 100,
                            width: 150
                        }}>
                        <AddBoxIcon />
                        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                            Create workshop
                        </Typography>
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link href="/mentor/details" passHref>
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
