import * as React from 'react';
import Snackbar, { SnackbarProps, SnackbarCloseReason } from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

interface MessageProps extends SnackbarProps {
  type: Color,
  message: string
}

const Message: React.FC<MessageProps> = ({
  open = false,
  type = 'success',
  message = '',
  autoHideDuration = 4000,  
  onClose
}: MessageProps) => {

  const handleClose = (event?: React.SyntheticEvent, reason?: SnackbarCloseReason) => {   
    onClose(event, reason);
  };
  
  return (
    <Snackbar 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open} 
      autoHideDuration={autoHideDuration} 
      onClose={handleClose}>
      <Alert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Message;
