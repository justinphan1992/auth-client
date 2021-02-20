
import * as React from "react";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import authState from '../../atoms/authState';
import { useRecoilValue } from 'recoil';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  
  const { isAuthenticated } = useRecoilValue(authState);

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
} 

export default PrivateRoute;
