import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'fixed',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }),
);

const Loading = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Loading;
