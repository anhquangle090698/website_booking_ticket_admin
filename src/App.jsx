import Authentication from 'components/Authentication';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//CSS entire of ant design
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//Main contain entire scss of app
import 'styles/scss/main.scss';
import NotFound from 'components/NotFound';

const Admin = lazy(() => import('features/Admin'));
const Login = lazy(() => import('features/Login'));
const ManageUser = lazy(() => import('features/ManageUser'));
const ManageMovie = lazy(() => import('features/ManageMovie'));
const ManageShowtime = lazy(() => import('features/ManageShowtime'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Redirect exact from="/" to="/admin" />
          <Authentication path="/admin" Component={Admin} />
          <Route path="/quan-ly-nguoi-dung" component={ManageUser} />
          <Route path="/quan-ly-phim" component={ManageMovie} />
          <Route path="/quan-ly-lich-chieu" component={ManageShowtime} />
          <Route path="/dang-nhap" component={Login} />

          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
