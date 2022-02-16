
import { Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';

function LoginButton() {
  return (
    <Link href="/login">
        <Button color="inherit" sx={{mt:2}} variant="contained" size = "large" >
        
        <Typography
            variant="h3">
            Login
        </Typography>    
                                           
    
        </Button>
    </Link> 
    
  )
}
export default LoginButton