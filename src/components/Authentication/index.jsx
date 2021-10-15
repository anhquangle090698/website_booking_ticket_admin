import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { ADMIN_LOGIN } from 'utils/config';

Authentication.propTypes = {
  Component: PropTypes.elementType,
};

//Authentication user logged, if not yet log in direct to component (sign), else log in direct to component (admin)
function Authentication(props) {
  //Component : direct after log in.
  //restParams: props of Route App(path, exact, location...)
  const { Component, ...restParams } = props;

  return (
    <Route
      {...restParams}
      //propsRoute: props of Route Authentication
      render={(propsRoute) => {
        if (localStorage.getItem(ADMIN_LOGIN)) {
          return <Component {...propsRoute}></Component>;
        }

        return <Redirect to="/dang-nhap"></Redirect>;
      }}
    />
  );
}

export default Authentication;
