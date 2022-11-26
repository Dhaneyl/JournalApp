import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Google } from "@mui/icons-material";
import { Link as routerLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import {  startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm( formData);

  //useMemo
  //This way you can configure your app for not having many auth from the same email
  //and button for login and google will be disable
  const isAuthenticating = useMemo( () => status === 'checking', [status])

  // Submit function
  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password });
    dispatch( startLoginWithEmailPassword({email, password}))
  };

  // Google signin button
  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");

    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="yourname@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="write a password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid 
              container
              display={ !!errorMessage ? '': 'none' }
              sx={{ mt: 1 }}>
              <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button 
              type="submit" 
              variant="contained" 
              disabled={isAuthenticating} fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={routerLink} color="inherit" to="/auth/register">
              Register now
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
