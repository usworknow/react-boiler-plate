/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from './utils/storage';

const PrivateRoute = ({ component: Component, componentProps, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn() ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect
          to={{ pathname: '/sign-in', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;