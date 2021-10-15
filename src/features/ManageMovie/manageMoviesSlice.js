import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import manageMovieApi from 'api/manageMovieApi';
import Swal from 'sweetalert2';
import history from 'utils/history';

const initialManageMovie = {
  listMovie: [],

  informationMovie: {},
  
  informationShowtime: {},

  isPendingListMovie: false,
  isPendingInformationMovie: false,
  isPendingInformationShowtime : false,
};

//Action get list movie
export const getListMovieAsync = createAsyncThunk(
  'manageMovie/getListMovie',
  async (params, thunkAPI) => {
    const response = await manageMovieApi.getListMovies();

    return response;
  }
);

//Action get information movie
export const getInformationMovieAsync = createAsyncThunk(
  'manageMovie/getInformationMovie',
  async (idMovie, thunkAPI) => {
    const response = await manageMovieApi.getInformationMovie(idMovie);

    return response;
  }
);

//Action update movie
export const postUpdateMovieAsync = createAsyncThunk(
  'manageMovie/postUpdateMovie',
  async (formData, thunkAPI) => {
    const response = await manageMovieApi.postUpdateMovie(formData);

    thunkAPI.dispatch(await getListMovieAsync());
    thunkAPI.dispatch(await getInformationMovieAsync(formData.get('maPhim')));

    return response;
  }
);

//Action add movie
export const postAddMovieAsync = createAsyncThunk(
  'manageMovie/postAddMovie',
  async (formData, thunkAPI) => {
    const response = await manageMovieApi.postAddMovie(formData);

    // thunkAPI.dispatch(await getListMovieAsync());
    // thunkAPI.dispatch(await getInformationMovieAsync(formData.get('maPhim')))

    return response;
  }
);

//Action delete movie by id movie
export const deleteMovieAsync = createAsyncThunk(
  'manageMovie/deleteMovie',
  async (idMovie, thunkAPI) => {
    try {
      const response = await manageMovieApi.deleteMovie(idMovie);

      thunkAPI.dispatch(await getListMovieAsync());

      Swal.fire({
        icon: 'success',
        text: 'Xóa phim thành công!',
        showConfirmButton: false,
        timer: 2000,
      });

      return response;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: 'Phim đã xếp lịch chiếu không thể xóa',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
);

//Action get information showtime by id movie
export const getInformationShowtimeAsync = createAsyncThunk(
  'manageMovie/getInformationShowtime',
  async (idMovie, thunkAPI) => {
    const response = await manageMovieApi.getInformationShowtime(idMovie);

    return response;
  }
);

export const manageMovieSlice = createSlice({
  name: 'manageMovie',
  initialState: initialManageMovie,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListMovieAsync.pending, (state, action) => {
      state.isPendingListMovie = true;
    });
    builder.addCase(getListMovieAsync.fulfilled, (state, action) => {
      state.listMovie = action.payload;
      state.isPendingListMovie = false;
    });
    builder.addCase(getInformationMovieAsync.pending, (state, action) => {
      state.isPendingInformationMovie = true;
    });
    builder.addCase(getInformationMovieAsync.fulfilled, (state, action) => {
      state.informationMovie = action.payload;
      state.isPendingInformationMovie = false;
    });
    builder.addCase(getInformationShowtimeAsync.pending, (state, action) => {
      state.isPendingInformationShowtime = true;
    });
    builder.addCase(getInformationShowtimeAsync.fulfilled, (state, action) => {
      state.informationShowtime = action.payload;
      state.isPendingInformationShowtime = false;
    });
  },
});

export const {} = manageMovieSlice.actions;
const { reducer: manageMovieReducer } = manageMovieSlice;
export default manageMovieReducer;
