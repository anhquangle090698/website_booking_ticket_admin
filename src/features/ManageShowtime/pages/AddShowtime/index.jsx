import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout, Select } from 'antd';
import FormAddShowtime from 'features/ManageShowtime/components/FormAddShowtime';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSystemCinemaAsync,
  getInformationCinemaAsync,
  getInformationMovieByNameMovie,
  getListCinemaBySystemCinemaAdd,
  getListMovieByCinema,
  getListTheaterByIdCinema,
} from 'features/ManageShowtime/manageShowtimeSlice';

AddShowtime.propTypes = {
  listAllSystemCinema: PropTypes.array,
  listCinemaBySystemCinemaAdd: PropTypes.array,
  listMovieByCinema: PropTypes.array,
  handleSelectSystemCinema: PropTypes.func,
  handleSelectCinema: PropTypes.func,
  handleSelectMovie: PropTypes.func,
};

function AddShowtime(props) {
  const { Content } = Layout;
  const { Option } = Select;

  const dispatch = useDispatch();

  const listAllSystemCinema = useSelector((state) => state.manageShowtime.listAllSystemCinema);
  const listCinemaBySystemCinemaAdd = useSelector(
    (state) => state.manageShowtime.listCinemaBySystemCinemaAdd
  );
  const listMovieByCinema = useSelector((state) => state.manageShowtime.listMovieByCinema);

  useEffect(() => {
    const getAllSystemCinema = async () => {
      dispatch(await getAllSystemCinemaAsync());
    };
    getAllSystemCinema();
  }, []);

  const handleSelectSystemCinema = async (value) => {
    dispatch(await getListCinemaBySystemCinemaAdd(value));
    dispatch(await getInformationCinemaAsync(value));
  };

  const handleSelectCinema = async (value) => {
    dispatch(await getListMovieByCinema(value));
    dispatch(await getListTheaterByIdCinema(value));
  };

  const handleSelectMovie = async (value) => {
    dispatch(await getInformationMovieByNameMovie(value));
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <h3 className="h3-title">Thêm Lịch Chiếu</h3>
            <div className="table-showtime__group">
              <div className="table-showtime__item">
                <p className="table-showtime__title">Hệ thống rạp</p>
                <Select
                  style={{ width: 200 }}
                  defaultValue={'Vui lòng chọn hệ thống rạp'}
                  onChange={handleSelectSystemCinema}
                  dropdownClassName="table-showtime__dropdown"
                  className="table-showtime__select"
                >
                  {listAllSystemCinema?.map((systemCinema, index) => {
                    return (
                      <Option
                        value={systemCinema.maHeThongRap}
                        key={systemCinema.maHeThongRap}
                        className="table-showtime__option"
                      >
                        {systemCinema.tenHeThongRap}
                      </Option>
                    );
                  })}
                </Select>
              </div>

              <div className="table-showtime__item">
                <p className="table-showtime__title">Cụm rạp</p>
                <Select
                  style={{ width: 320 }}
                  defaultValue={'Vui lòng chọn cụm rạp'}
                  onChange={handleSelectCinema}
                  dropdownClassName="table-showtime__dropdown"
                  className="table-showtime__select"
                >
                  {listCinemaBySystemCinemaAdd[0]?.lstCumRap?.map((listCinema, index) => {
                    return (
                      <Option
                        value={listCinema.maCumRap}
                        key={listCinema.maCumRap}
                        className="table-showtime__option"
                      >
                        {listCinema.tenCumRap}
                      </Option>
                    );
                  })}
                </Select>
              </div>

              <div className="table-showtime__item">
                <p className="table-showtime__title">Danh sách phim</p>
                <Select
                  style={{ width: 320 }}
                  defaultValue={'Vui lòng chọn phim'}
                  onChange={handleSelectMovie}
                  dropdownClassName="table-showtime__dropdown"
                  className="table-showtime__select"
                >
                  {listMovieByCinema[0]?.danhSachPhim?.map((movie, index) => {
                    return (
                      <Option
                        value={movie.maPhim}
                        key={movie.maPhim}
                        className="table-showtime__option"
                      >
                        {movie.tenPhim}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <FormAddShowtime></FormAddShowtime>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default AddShowtime;
