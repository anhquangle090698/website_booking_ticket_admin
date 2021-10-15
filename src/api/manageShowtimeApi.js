import { ACCESS_TOKEN_ADMIN } from 'utils/config';
import axiosClient from './axiosClient';

//Api use get/post/put/delete give data showtime feature (render and handle logic showtime)
const ManageShowtimeApi = {
  //Api get list system cinema return data(array)
  getAllListSystemCinema: () => {
    const url = '/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03';
    return axiosClient.get(url);
  },

  //Api get list cinema by system cinema return data(array)
  //Need param (string) id system cinema
  getInformationCinema: (idSystemCinema) => {
    const url = `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idSystemCinema}`;
    return axiosClient.get(url);
  },

  //Api post create showtime return
  //Need data information
  // {
  //   "maPhim": 0,
  //   "ngayChieuGioChieu": "string",
  //   "maRap": 0,
  //   "giaVe": 0
  // }
  //Need token (authorization)
  postCreateShowtime: (informationShowtime) => {
    const url = '/QuanLyDatVe/TaoLichChieu';
    return axiosClient.post(url, informationShowtime, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },
};

export default ManageShowtimeApi;
