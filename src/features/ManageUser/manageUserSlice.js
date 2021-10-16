import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginApi from 'api/loginApi';
import ManageUserApi from 'api/manageUserApi';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, USER_LOGIN } from 'utils/config';
import history from 'utils/history';

const initialManageUser = {
  listUser: [],

  informationSearchUser: [],

  isCheckAdd: '',
  isPendingListUser: false,
  isPendingInformationUser: false,
};

//Action get all user
export const getAllUserAsync = createAsyncThunk(
  'manageUser/getAllUser',
  async (params, thunkAPI) => {
    const response = await ManageUserApi.getAllUser();

    return response;
  }
);

//Action delete user
export const deleteUserAsync = createAsyncThunk(
  'manageUser/deleteUser',
  async (taiKhoan, thunkAPI) => {
    try {
      const response = await ManageUserApi.deleteUser(taiKhoan);

      thunkAPI.dispatch(await getAllUserAsync());

      Swal.fire({
        icon: 'success',
        text: 'Xóa người dùng thành công!',
        showConfirmButton: false,
        timer: 2000,
      });

      return response;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Xóa thất bại',
        text: 'Người dùng đã đặt vé không thể xóa!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
);

//Action get search user by account name
export const getSearchUserAsync = createAsyncThunk(
  'manageUser/getSearchUser',
  async (account, thunkAPI) => {
    const response = await ManageUserApi.getSearchUser(account);

    return response;
  }
);

//Action post add user
export const postAddUserAsync = createAsyncThunk(
  'manageUser/postAddUser',
  async (informationAdd, thunkAPI) => {
    try {
      const response = await ManageUserApi.postAddUser(informationAdd);

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//Action put update user
export const putUpdateUserAsync = createAsyncThunk(
  'manageUser/putUpdateUser',
  async (informationUpdate, thunkAPI) => {
    const response = await ManageUserApi.putUpdateUser(informationUpdate);

    thunkAPI.dispatch(await getAllUserAsync());
    thunkAPI.dispatch(await getSearchUserAsync(informationUpdate.taiKhoan));

    return response;
  }
);

export const manageUserSlice = createSlice({
  name: 'manageUser',
  initialState: initialManageUser,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserAsync.pending, (state, action) => {
      state.isPendingListUser = true;
    });
    builder.addCase(getAllUserAsync.fulfilled, (state, action) => {
      state.listUser = action.payload;
      state.isPendingListUser = false;
    });
    builder.addCase(getSearchUserAsync.pending, (state, action) => {
      state.isPendingInformationUser = true;
    });
    builder.addCase(getSearchUserAsync.fulfilled, (state, action) => {
      state.informationSearchUser = action.payload;
      state.isPendingInformationUser = false;
    });
    builder.addCase(postAddUserAsync.fulfilled, (state, action) => {
      state.isCheckAdd = '';
    });
    builder.addCase(postAddUserAsync.rejected, (state, action) => {
      state.isCheckAdd = action.payload;
    });
  },
});

// export const {} = manageUserSlice.actions;
const { reducer: manageUserReducer } = manageUserSlice;
export default manageUserReducer;
