import React from 'react'
import { Typography, Button } from '@mui/material';

function RegisterButton() {
  return (
    <Button color="inherit" sx={{ mt: 2 }} variant="contained" size="large" href='/user/register' >
      <Typography variant="h3">Register</Typography>
    </Button>
  )
}
export default RegisterButton