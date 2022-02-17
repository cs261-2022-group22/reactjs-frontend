import { Box, Button, Container, Typography } from "@mui/material"
import { useRouter } from 'next/router'

export default function Index() {

    const router = useRouter()
    const { error } = router.query
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'grid', rowGap: 3 }}>
                <Typography textAlign={"center"} variant="h4">Failed to log you in</Typography>
                <Typography textAlign={"center"} color="#ff3437" variant="h6">{error}</Typography>
                <br />
                <Button variant="contained" href="/">Back to Home Page</Button>
            </Box>
        </Container>
    )
}
