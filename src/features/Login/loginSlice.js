import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginApi from 'api/loginApi';
import Swal from 'sweetalert2';
import { ADMIN_LOGIN, ACCESS_TOKEN_ADMIN } from 'utils/config';
import history from 'utils/history';

//Information admin save local storage
let adminSignInStorage = {};

//If logged, get information from local storage assign for user.
localStorage.getItem(ADMIN_LOGIN)
  ? (adminSignInStorage = JSON.parse(localStorage.getItem(ADMIN_LOGIN)))
  : (adminSignInStorage = {});

const initialLogin = {
  //Information admin after sign in
  informationLogin: adminSignInStorage,
};

//Action post sign in
export const postSignInAsync = createAsyncThunk(
  'login/postSignIn',
  async (informationSignIn, { rejectWithValue }) => {
    let timerInterval;

    // thunkAPI.dispatch(...)
    // The value we return becomes the `fulfilled` action payload

    try {
      const response = await LoginApi.postSignIn(informationSignIn);
      if (response && response.maLoaiNguoiDung === 'QuanTri') {
        //save data to local storage
        localStorage.setItem(ADMIN_LOGIN, JSON.stringify(response));

        //save token to local storage
        localStorage.setItem(ACCESS_TOKEN_ADMIN, response.accessToken);
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          html: 'Chuyển tới trang chủ sau 2.5s',
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push('/admin');
          }
        });
        return response;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Bạn không có quyền quản trị',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Sai tài khoản hoặc mật khẩu',
        showConfirmButton: false,
        timer: 1500,
      });

      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialLogin,
  reducers: {
    //Handle logic when use sign out
    handleSignOut: (state) => {
      state.informationLogin = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignInAsync.fulfilled, (state, action) => {
      state.informationLogin = action.payload;
    });
    builder.addCase(postSignInAsync.rejected, (state, action) => {
      state.informationLogin = action.payload;
    });
  },
});

export const { handleSignOut } = loginSlice.actions;
const { reducer: loginReducer } = loginSlice;
export default loginReducer;
