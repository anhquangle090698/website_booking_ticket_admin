import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AdminApi from 'api/adminApi';
import history from 'utils/history';

const initialAdmin = {
  informationAdmin: {},
  informationUpdateAdmin : {}
};

//Action get search user by account name
export const getInformationAdminAsync = createAsyncThunk(
  'admin/getInformationAdmin',
  async (account, thunkAPI) => {
    const response = await AdminApi.getInformationAdmin(account);

    return response;
  }
);

//Action put update user
export const putUpdateAdminAsync = createAsyncThunk(
  'manageUser/putUpdateAdmin',
  async (informationUpdate, thunkAPI) => {
    const response = await AdminApi.putUpdateAdmin(informationUpdate);

    thunkAPI.dispatch(await getInformationAdminAsync(informationUpdate.taiKhoan));

    return response;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdmin,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInformationAdminAsync.fulfilled, (state, action) => {
      state.informationAdmin = action.payload;
    });
    builder.addCase(putUpdateAdminAsync.fulfilled, (state, action) => {
      state.informationAdmin = action.payload;
    });
  },
});

const { reducer: adminReducer } = adminSlice;
export default adminReducer;
