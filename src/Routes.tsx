import * as React from 'react';
import { Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes : React.FC = () => {
  return (    
    <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/register">
          <Register />
        </PublicRoute>
    </Switch>   
  );
}

export default Routes;

