import { ACCESS_TOKEN_ADMIN } from 'utils/config';
import axiosClient from './axiosClient';

//Api use get/post/put/delete data give manage user feature
const ManageUserApi = {
  //Api get all user return data(array)
  //Need param (id group default 'GP03')
  getAllUser: () => {
    const url = '/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03';
    return axiosClient.get(url);
  },

  //Api delete user return data(string)
  //Need param (string) tai khoan
  deleteUser: (taiKhoan) => {
    const url = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },

  //Api get search user by account name return data (array)
  //Need param (string) account name
  //Need param (id group default 'GP03')
  getSearchUser: (account) => {
    const url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP03&tuKhoa=${account}`;
    return axiosClient.get(url);
  },

  //Api post add user return data ()
  //Need data information add
  //{
  //   "taiKhoan": "string",
  //   "matKhau": "string",
  //   "email": "string",
  //   "soDt": "string",
  //   "maNhom": "string",
  //   "maLoaiNguoiDung": "string",
  //   "hoTen": "string"
  // }
  //Need token (authorization)
  postAddUser: (informationAdd) => {
    const url = '/QuanLyNguoiDung/ThemNguoiDung';
    return axiosClient.post(url, informationAdd, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },

  //Api put update information user return data(string)
  //Need data information update
  // {
  //   "taiKhoan": "string",
  //   "matKhau": "string",
  //   "email": "string",
  //   "soDt": "string",
  //   "maNhom": "string",
  //   "maLoaiNguoiDung": "string",
  //   "hoTen": "string"
  // }
  //Need token (authorization)
  putUpdateUser: (informationUpdate) => {
    const url = '/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    return axiosClient.put(url, informationUpdate, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },
};

export default ManageUserApi;
