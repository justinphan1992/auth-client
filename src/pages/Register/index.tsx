import React from 'react';
import { AxiosResponse } from 'axios'
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LoadingButton from '../../components/LoadingButton';
import TextField from '@material-ui/core/TextField';
import { default as MuiLink } from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/AppBar';
import FormWrapper from '../../components/FormWrapper'
import { useForm } from "react-hook-form";
import { UserRegister, RegisterFormFields  } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from '../../components/DatePicker';
import useRegister from '../../hooks/useRegister';
import useMessage from '../../hooks/useMessage';
import dayjs from 'dayjs';
import * as yup from "yup";
import useStyles from './styles';


const schema = yup.object().shape({
  email: yup.string()
    .required('Email is required')
    .email("Email is invalid"),
  username: yup.string()
    .required('Username is required'),  
  dob: yup.date()
    .nullable()
    .required("Date of birth is required"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password should at least 6 characters'), 
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export default function SignUp() {
  
  const classes = useStyles();

  const history = useHistory();

  const { showMessage } = useMessage();

  const { register, handleSubmit, control, errors, setError } = useForm<UserRegister>({     
    resolver: yupResolver(schema),
    defaultValues: {
      dob: null
    }
  });

  const  { onRegister, isLoading } = useRegister()

  const onSubmit = (data: UserRegister) => {    
    data.dob = dayjs(data.dob).format('YYYY-MM-DD');
    onRegister(data, {
      onSuccess: () => {
        history.replace('/login');
        showMessage('You have registered successfully', 'success');
      },
      onError: (e) => {
        const error = e as AxiosResponse;
        if (error.status === 400) {        
          Object.keys(error.data).forEach((field) => {             
            setError(field as RegisterFormFields, {
              type: 'server',
              message: error.data[field][0],
              shouldFocus: true,
            });                    
          })
        }
      }
    })       
  };

  return (
    <React.Fragment>
      <AppBar showLogout={false} />
      <Container component="main" maxWidth="xs">        
        <FormWrapper>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>      
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  inputRef={register}
                  id="username"
                  label="Username"
                  name="username"
                  error={Boolean(errors.username?.message)}
                  helperText={errors.username?.message}
                />
              </Grid>     
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  inputRef={register}
                  id="email"
                  label="Email Address"
                  name="email"
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker 
                  label="Date of Birth"
                  name="dob"                
                  control={control}
                  error={errors?.dob?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  inputRef={register}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"      
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  inputRef={register}
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"     
                  error={Boolean(errors.password_confirmation?.message)}
                  helperText={errors.password_confirmation?.message}             
                />
              </Grid>            
            </Grid>
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </LoadingButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  <MuiLink component="span" variant="body2">
                    Already have an account? Sign in
                  </MuiLink>
                </Link>                
              </Grid>
            </Grid>
          </form>
        </FormWrapper>    
      </Container>      
    </React.Fragment>
  );
}