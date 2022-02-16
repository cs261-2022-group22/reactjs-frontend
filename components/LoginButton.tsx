import React from 'react'
import { Typography, Button } from '@mui/material';

function LoginButton() {
  return (
    <Button color="inherit" sx={{ mt: 2 }} variant="contained" size="large" href='/api/auth/signin' >
      <Typography variant="h3"> Login</Typography>
    </Button>
  )
}
export default LoginButton