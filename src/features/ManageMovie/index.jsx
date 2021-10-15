import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import ListMovie from './pages/ListMovie';
import AddMovie from './pages/AddMovie';

ManageMovie.propTypes = {
  match: PropTypes.object.isRequired,
};
function ManageMovie(props) {
  //Get path from url
  const match = useRouteMatch();

  return (
    <Suspense>
      <Switch>
        <Route path={`${match.url}/danh-sach`} component={ListMovie} />
        <Route path={`${match.url}/them`} component={AddMovie} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default ManageMovie;
