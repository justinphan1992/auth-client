import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean
}

const LoadingButton: React.FC<LoadingButtonProps> = (props: LoadingButtonProps) => {
  const { loading, children, ...rest } = props;

  return (
    <Button {...rest} disabled={loading} >
      {loading && <CircularProgress size={24} />}
      {!loading && children}
    </Button>
  )
}

export default LoadingButton;