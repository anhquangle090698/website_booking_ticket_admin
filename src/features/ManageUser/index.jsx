import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import ListUser from './pages/ListUser';
import AddUser from './pages/AddUser';

ManageUser.propTypes = {
  match: PropTypes.object.isRequired,
};

function ManageUser(props) {
  //Get path from url
  const match = useRouteMatch();

  return (
    <Suspense>
      <Switch>
        <Route path={`${match.url}/danh-sach`} component={ListUser} />
        <Route path={`${match.url}/them`} component={AddUser} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default ManageUser;
