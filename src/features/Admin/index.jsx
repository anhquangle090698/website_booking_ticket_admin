import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import NotFound from 'components/NotFound';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import InformationAdmin from './pages/InformationAdmin';
import Home from './pages/Home';

Admin.propTypes = {
  match: PropTypes.object.isRequired,
};

function Admin(props) {
  //Get path from url
  const match = useRouteMatch();
  return (
    <>
      <Suspense>
        <Switch>
          <Route exact path={match.url} component={Home} />
          <Route path={`${match.url}/thong-tin-tai-khoan`} component={InformationAdmin} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default Admin;
