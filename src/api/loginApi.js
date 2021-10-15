import axiosClient from './axiosClient';

//Api use post data form post sign in and sign up give login feature (handle logic login)
const LoginApi = {

  //Api post sign in return data(object)
  //Need data information sign in
  // {
  //   "taiKhoan": "string",
  //   "matKhau": "string"
  // }
  postSignIn: (informationSignIn) => {
    const url = '/QuanLyNguoiDung/DangNhap';
    return axiosClient.post(url, informationSignIn);
  },
};

export default LoginApi;
