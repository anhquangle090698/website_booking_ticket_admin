import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ManageShowtimeApi from 'api/manageShowtimeApi';

const initialManageShowtime = {
  //List Showtime
  listAllSystemCinema: [],
  listCinemaBySystemCinema: [],
  listShowtimeByCinema: [],

  //Add Showtime
  informationCinemaByIdSystemCinema: [],
  listTheaterByIdCinema: [],

  listCinemaBySystemCinemaAdd: [],
  listMovieByCinema: [],
  informationMovieByNameMovie: {},

  //Create showtime
};

//Action get all system cinema
export const getAllSystemCinemaAsync = createAsyncThunk(
  'manageShowtime/getAllSystemCinema',
  async (params, thunkAPI) => {
    const response = await ManageShowtimeApi.getAllListSystemCinema();

    return response;
  }
);

//Action get list cinema by system cinema
export const getInformationCinemaAsync = createAsyncThunk(
  'manageShowtime/getInformationCinema',
  async (idSystemCinema, thunkAPI) => {
    const response = await ManageShowtimeApi.getInformationCinema(idSystemCinema);

    return response;
  }
);

//Action post create showtime
export const postCreateShowtimeAsync = createAsyncThunk(
  'manageShowtime/postCreateShowtime',
  async (informationShowtime, thunkAPI) => {
    try {
      const response = await ManageShowtimeApi.postCreateShowtime(informationShowtime);

      console.log('response', response);

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const manageShowtimeSlice = createSlice({
  name: 'manageShowtime',
  initialState: initialManageShowtime,
  reducers: {
    //Handle logic get list cinema by system cinema
    getListCinemaBySystemCinema: (state, action) => {
      state.listCinemaBySystemCinema = state.listAllSystemCinema?.filter(
        (systemCinema) => systemCinema.maHeThongRap === action.payload
      );
    },

    //Handle logic list showtime by cinema
    getListShowtimeByCinema: (state, action) => {
      state.listShowtimeByCinema = state.listCinemaBySystemCinema[0]?.lstCumRap?.filter(
        (lcr) => lcr.maCumRap === action.payload
      );
    },

    //Handle logic get list cinema by system cinema in add showtime component
    getListCinemaBySystemCinemaAdd: (state, action) => {
      state.listCinemaBySystemCinemaAdd = state.listAllSystemCinema?.filter(
        (systemCinema) => systemCinema.maHeThongRap === action.payload
      );
    },

    //Handle logic list movie by cinema
    getListMovieByCinema: (state, action) => {
      state.listMovieByCinema = state.listCinemaBySystemCinemaAdd[0]?.lstCumRap?.filter(
        (lcr) => lcr.maCumRap === action.payload
      );
    },

    //Handle logic information movie by name movie in add showtime component
    getInformationMovieByNameMovie: (state, action) => {
      state.informationMovieByNameMovie = state.listMovieByCinema[0]?.danhSachPhim?.filter(
        (lmbc) => lmbc.maPhim === action.payload
      );
    },

    //Handle logic list theater by id cinema add showtime component
    getListTheaterByIdCinema: (state, action) => {
      state.listTheaterByIdCinema = state.informationCinemaByIdSystemCinema?.filter(
        (idc) => idc.maCumRap === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSystemCinemaAsync.fulfilled, (state, action) => {
      state.listAllSystemCinema = action.payload;
    });
    builder.addCase(getInformationCinemaAsync.fulfilled, (state, action) => {
      state.informationCinemaByIdSystemCinema = action.payload;
    });
  },
});

export const {
  getListCinemaBySystemCinema,
  getListCinemaBySystemCinemaAdd,
  getListShowtimeByCinema,
  getListMovieByCinema,
  getInformationMovieByNameMovie,
  getListTheaterByIdCinema,
} = manageShowtimeSlice.actions;
const { reducer: manageShowtimeReducer } = manageShowtimeSlice;
export default manageShowtimeReducer;
