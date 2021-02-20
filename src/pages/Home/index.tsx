import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DatePicker from '../../components/DatePicker';
import FormWrapper from '../../components/FormWrapper';
import AppBar from  '../../components/AppBar';
import LoadingButton from  '../../components/LoadingButton';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRecoilValue } from 'recoil';
import { userProfile } from '../../atoms';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import dayjs from 'dayjs';

import useStyles from './styles';

export interface IProfileFormInputs {
  email: string,
  dob: string | null,
}

const schema = yup.object().shape({
  email: yup.string()
    .required('Email is required')
    .email("Email is invalid"), 
  dob: yup.date()
    .nullable()
    .required("Date of birth is required"),
})


const Home: React.FC = () => {

  const classes = useStyles();

  const { email, dob } = useRecoilValue(userProfile);

  const { onUpdate, isLoading } = useUpdateProfile();

  const { register, handleSubmit, control, errors } = useForm<IProfileFormInputs>({    
    resolver: yupResolver(schema),
    defaultValues: {
      email,
      dob,
    }
  });

  const onSubmit = (data: IProfileFormInputs) => {
    data.dob = dayjs(data.dob).format('YYYY-MM-DD');
    onUpdate(data);
  };

  return (
    <React.Fragment>
      <AppBar />
      <Container component="main" maxWidth="xs">
        <FormWrapper>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  inputRef={register}
                  id="email"
                  label="Email"
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
            </Grid>            
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </LoadingButton>
          </form>
        </FormWrapper>
      </Container>
    </React.Fragment>
  )
}

export default Home;
