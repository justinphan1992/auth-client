
import * as React from "react";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import authState from '../../atoms/authState';
import { useRecoilValue } from 'recoil';

const PublicRoute: React.FC<RouteProps> = (props) => {
  
  const { isAuthenticated } = useRecoilValue(authState);

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return <Route {...props} />
} 

export default PublicRoute;
