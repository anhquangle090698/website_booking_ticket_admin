import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Sign from './pages/Sign';
import NotFound from 'components/NotFound';

Login.propTypes = {
  match: PropTypes.object.isRequired,
};

function Login(props) {
  //Get path from url
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={Sign} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Login;
