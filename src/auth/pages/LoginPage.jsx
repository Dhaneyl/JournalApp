import { Google } from '@mui/icons-material'
import { Link as routerLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout';


export const LoginPage = () => {
  return (

   <AuthLayout title="Login">
    <form>
      <Grid container>
        <Grid item xs={12} sx={{mt:2}}>
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
            placeholder='write a password'
            fullWidth
          />
        </Grid>
        <Grid container spacing={2} sx={{mb:2, mt:1}}>
          <Grid item xs={12} sm={6}>
          <Button variant='contained' fullWidth>
            Login
          </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Button variant='contained' fullWidth>
            <Google/>
             <Typography sx={{ml:1}}> Google </Typography>
          </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Link component={routerLink} color='inherit' to="/auth/register">Register now</Link>
         
        </Grid>
      </Grid>
     </form>
   </AuthLayout>
     
     
    
  )
}