import * as React from 'react';
import { default as MuiAppBar } from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useLogout from '../../hooks/useLogout';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}))

const AppBar = ({ showLogout = true }) => {

  const classes = useStyles();

  const { logout } = useLogout();

  const handleLogout = () => logout();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          className={classes.title} 
          color="inherit"
        >
          Demo App
        </Typography>
        {
          showLogout && (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )
        }        
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;
