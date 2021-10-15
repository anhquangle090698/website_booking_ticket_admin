import { ACCESS_TOKEN_ADMIN } from 'utils/config';
import axiosClient from './axiosClient';

const AdminApi = {
  //Api get information admin by account name return data (array)
  //Need param (string) account name
  //Need param (id group default 'GP03')
  getInformationAdmin : (account) => {
    const url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP03&tuKhoa=${account}`;
    return axiosClient.get(url);
  },

  //Api put update information admin return data(string)
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
  putUpdateAdmin: (informationUpdate) => {
    const url = '/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    return axiosClient.put(url, informationUpdate, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },
}

export default AdminApi;