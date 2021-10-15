import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import ListShowtime from './pages/ListShowtime';
import AddShowtime from './pages/AddShowtime';

ManageShowtime.propTypes = {
  match: PropTypes.object.isRequired,
};

function ManageShowtime(props) {
  //Get path from url
  const match = useRouteMatch();

  return (
    <Suspense>
      <Switch>
        <Route path={`${match.url}/danh-sach`} component={ListShowtime} />
        <Route path={`${match.url}/them`} component={AddShowtime} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default ManageShowtime;
