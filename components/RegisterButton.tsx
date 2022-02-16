import React from 'react'
import { Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';

function RegisterButton() {
  return (
    <Link href="/register">
      <Button color="inherit" sx={{ mt: 2 }} variant="contained" size="large" >
        <Typography
          variant="h3">
          Sign Up
        </Typography>
      </Button>
    </Link>

  )
}
export default RegisterButton