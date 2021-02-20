import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { default as MuiLink }  from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/AppBar';
import FormWrapper from '../../components/FormWrapper'
import LoadingButton from '../../components/LoadingButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useLogin from '../../hooks/useLogin';
import useStyles from './styles';

export interface ILoginFormInput {
  username: string,
  password: string,
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  
  const classes = useStyles();

  const { login, isLoading, isError } = useLogin();
  
  const { register, handleSubmit, errors } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: ILoginFormInput) => login(data);

  return (
    <React.Fragment>
      <AppBar showLogout={false} />
      <Container component="main" maxWidth="xs">
        <FormWrapper>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            isError && (
              <Alert className={classes.alert} severity="error">Username or password is incorrect</Alert>
            ) 
          }          
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="username"
              label="Username"
              name="username"      
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputRef={register}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"            
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />         
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>              
              </Grid>
              <Grid item>
                <Link to="/register">
                  <MuiLink component="span" variant="body2">
                    {"Don't have an account? Sign Up"}
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