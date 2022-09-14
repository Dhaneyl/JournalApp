
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as routerLink} from 'react-router-dom'
import { AuthLayout } from '../layout'

export const RegisterPage = () => {
  return (
    <AuthLayout title='Sign up'>
     <form>
      <Grid container>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField
            label="Full Name"
            type="text"
            placeholder='Nicole Sanchez'
            fullWidth
          />
        </Grid>
        
        <Grid item  xs={12} sx={{mt:2}}>
          <TextField
            label="Email"
            type="email"
            placeholder='yourname@google.com'
            fullWidth
          />
        </Grid>
        <Grid item  xs={12} sx={{mt:2}}>
          <TextField
            label="Password"
            type="password"
            placeholder='write your password'
            fullWidth
          />
        </Grid>
        <Grid container spacing={2} sx={{mb:2, mt:1}}>
          <Grid item xs={12} >
          <Button variant='contained' fullWidth>
            Submit
          </Button>
          </Grid>
          
        </Grid>
        <Grid container direction='row' justifyContent='end'>
        <Typography sx={{mr: 1}}>Do you already have an account?</Typography>
          <Link component={routerLink} color='inherit' to="/auth/login">Login</Link>
         
        </Grid>
      </Grid>
     </form>

    </AuthLayout>
  )
}
