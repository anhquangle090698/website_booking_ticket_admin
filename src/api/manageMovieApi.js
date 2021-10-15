import { ACCESS_TOKEN_ADMIN } from 'utils/config';
import axiosClient from './axiosClient';

//Api use get/post/put/delete give data movies feature (render and handle logic movies)
const manageMovieApi = {
  //Api get list movies return data(array)
  //Need params (string) id group 'GP03'
  getListMovies: () => {
    const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP03';
    return axiosClient.get(url);
  },

  //Api get information movie return data(object)
  //Need param (number) id movie
  getInformationMovie: (idMovie) => {
    const url = `/QuanLyPhim/LayThongTinPhim?MaPhim=${idMovie}`;
    return axiosClient.get(url);
  },

  //Api post update movie return data(object)
  //Need param (array) form data
  postUpdateMovie: (formData) => {
    const url = '/QuanLyPhim/CapNhatPhimUpload';
    return axiosClient.post(url, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },

  //Api post add movie return data
  //Need param (array) from data
  postAddMovie: (formData) => {
    const url = '/QuanLyPhim/ThemPhimUploadHinh';
    return axiosClient.post(url, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },

  //Api delete movie by id movie return data(string)
  //Need param (string) id movie
  deleteMovie: (idMovie) => {
    const url = `/QuanLyPhim/XoaPhim?MaPhim=${idMovie}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ADMIN),
      },
    });
  },

  //Api get information showtime by id movie return object
  //Need param (string) id movie
  getInformationShowtime: (idMovie) => {
    const url = `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`;
    return axiosClient.get(url);
  }
};

export default manageMovieApi;
