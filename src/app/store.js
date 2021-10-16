import { configureStore } from '@reduxjs/toolkit';
import adminReducer from 'features/Admin/adminSlice';
import loginReducer from 'features/Login/loginSlice';
import manageMovieReducer from 'features/ManageMovie/manageMoviesSlice';
import manageShowtimeReducer from 'features/ManageShowtime/manageShowtimeSlice';
import manageUserReducer from 'features/ManageUser/manageUserSlice';

//Root reducer where contain all reducer of app, when create new reducer need sign up with root reducer.
const rootReducer = {
  login: loginReducer, //loginSlice
  admin: adminReducer, //adminSlice
  manageUser : manageUserReducer, //manageUserSlice
  manageMovie : manageMovieReducer, //manageMovieSlice
  manageShowtime : manageShowtimeReducer, //manageShowtimeSlice
};

//configureStore is provided by Redux toolkit
const store = configureStore({
  reducer: rootReducer,
});

export default store;
