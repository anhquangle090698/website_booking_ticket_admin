import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Table } from 'antd';
import {
  getAllSystemCinemaAsync,
  getListCinemaBySystemCinema,
  getListShowtimeByCinema,
} from 'features/ManageShowtime/manageShowtimeSlice';
import moment from 'moment';

TableShowtime.propTypes = {
  listAllSystemCinema: PropTypes.array,
  listCinemaBySystemCinema: PropTypes.array,
  listShowtimeByCinema: PropTypes.array,
  listMovie: PropTypes.array,
  handleSelectSystemCinema: PropTypes.func,
  handleSelectCinema: PropTypes.func,
};

function TableShowtime(props) {
  const { Option } = Select;

  const dispatch = useDispatch();

  const listAllSystemCinema = useSelector((state) => state.manageShowtime.listAllSystemCinema);
  const listCinemaBySystemCinema = useSelector(
    (state) => state.manageShowtime.listCinemaBySystemCinema
  );
  const listShowtimeByCinema = useSelector((state) => state.manageShowtime.listShowtimeByCinema);

  useEffect(() => {
    const getAllSystemCinema = async () => {
      dispatch(await getAllSystemCinemaAsync());
    };
    getAllSystemCinema();
  }, []);

  const listMovie = listShowtimeByCinema[0]?.danhSachPhim?.map((showtime, index) => {
    return {
      maPhim: showtime.maPhim,
      tenPhim: showtime.tenPhim,
      hinhAnh: showtime.hinhAnh,
      children: showtime.lstLichChieuTheoPhim.map((lst, index1) => {
        return {
          maLichChieu: lst.maLichChieu,
          maRap: lst.maRap,
          tenRap: lst.tenRap,
          ngayChieuGioChieu: moment(lst.ngayChieuGioChieu).format('DD-MM-YYYY LT'),
          giaVe: lst.giaVe.toLocaleString(2),
        };
      }),
    };
  });

  const handleSelectSystemCinema = async (value) => {
    dispatch(await getListCinemaBySystemCinema(value));
  };

  const handleSelectCinema = async (value) => {
    dispatch(await getListShowtimeByCinema(value));
  };

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: 110,
      render: (maPhim) => <span className="table-showtime__text">{maPhim}</span>,
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: 150,
      render: (tenPhim) => <span className="table-showtime__text">{tenPhim}</span>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: 100,
      render: (hinhAnh) => <img src={hinhAnh} alt={hinhAnh} className="table-showtime__image" />,
    },
    {
      title: 'Lịch chiếu',
      children: [
        {
          title: 'Mã lịch chiếu',
          dataIndex: 'maLichChieu',
          key: 'maLichChieu',
          width: 150,
          render: (maLichChieu) => (
            <span className="table-showtime__text">
              {maLichChieu ? `${maLichChieu}` : 'Nhấn dấu "+" để xem chi tiết'}
            </span>
          ),
        },
        {
          title: 'Mã rạp',
          dataIndex: 'maRap',
          key: 'maRap',
          width: 150,
          render: (maRap) => <span className="table-showtime__text">{maRap}</span>,
        },
        {
          title: 'Tên rạp',
          dataIndex: 'tenRap',
          key: 'tenRap',
          width: 150,
          render: (tenRap) => <span className="table-showtime__text">{tenRap}</span>,
        },
        {
          title: 'Ngày giờ chiếu',
          dataIndex: 'ngayChieuGioChieu',
          key: 'ngayChieuGioChieu',
          width: 150,
          render: (ngayChieuGioChieu) => (
            <span className="table-showtime__text">{ngayChieuGioChieu}</span>
          ),
        },
        {
          title: 'Giá vé (VND)',
          dataIndex: 'giaVe',
          key: 'giaVe',
          width: 150,
          render: (giaVe) => <span className="table-showtime__text">{giaVe}</span>,
        },
      ],
    },
  ];

  return (
    <>
      <h3 className="h3-title">Thông Tin Lịch Chiếu Theo Hệ Thống Và Cụm Rạp</h3>

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
                  key={index}
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
            {listCinemaBySystemCinema[0]?.lstCumRap?.map((listCinema, index) => {
              return (
                <Option value={listCinema.maCumRap} key={index} className="table-showtime__option">
                  {listCinema.tenCumRap}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={listMovie}
        rowKey={(e) => e.maPhim}
        bordered
        scroll={{ y: 500 }}
      />
    </>
  );
}

export default TableShowtime;
