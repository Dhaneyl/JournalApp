
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as routerLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { useForm } from '../../hooks'




//? Form Data
const formData = {
  displayName: '',
  email: '',
  password: '',
}

//? Validation var
const formValidations = {
  email: [ (value) => value.includes('@'), '*The email should have a @*'],
  password: [ (value) => value.length >= 6, '*The password must have more than 6 letters.*'],
  displayName: [ (value) => value.length >= 1, '*The name is required.*'],
}

//? functional component
export const RegisterPage = () => {
  
  const dispatch = useDispatch()
    // This state is for no having the app sending the formValidations without the submution
  const [formSubmitted, setformSubmitted] = useState(false);
   
  const { status, errorMessage } = useSelector( state => state.auth );

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

 

//  useForm
  const {displayName, 
    email, 
    password, 
    onInputChange, 
    formState, 
    isFormValid, 
    displayNameValid, 
    passwordValid, 
    emailValid } = useForm(formData, formValidations );
  
  

  const onSubmit = (event) =>{
    event.preventDefault();
    setformSubmitted(true);

   if( !isFormValid ) return;

   dispatch ( startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Sign up'>
     {/* <h1> FormValid {isFormValid ? 'Valid': 'No valid' }</h1> */}
     <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
      <Grid container>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField
            label="Full Name"
            type="text"
            placeholder='Nicole Sanchez'
            fullWidth
            name='displayName'
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText= {displayNameValid } 
          />
        </Grid>
        
        <Grid item  xs={12} sx={{mt:2}}>
          <TextField
            label="Email"
            type="email"
            placeholder='yourname@google.com'
            fullWidth
            name='email'
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText= {emailValid } 
          />
        </Grid>
        <Grid item  xs={12} sx={{mt:2}}>
          <TextField
            label="Password"
            type="password"
            placeholder='write your password'
            fullWidth
            name='password'
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmitted}
            helperText= {passwordValid } 
          />
        </Grid>
        <Grid container spacing={2} sx={{mb:2, mt:1}}>
        {/* Error message */}
        <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '' : 'none'}
    
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
          {/* end */}
          <Grid item xs={12} >
          <Button 
          disabled ={ isCheckingAuthentication  }
          variant='contained' 
          fullWidth 
          type='submit'>
            Create Account
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
