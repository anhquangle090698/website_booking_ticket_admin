import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMovieAsync,
  getInformationMovieAsync,
  getInformationShowtimeAsync,
  getListMovieAsync,
} from 'features/ManageMovie/manageMoviesSlice';
import moment from 'moment';
import { Table, Modal, Popconfirm, Rate } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import FormEditMovie from '../FormEditMovie';
import DetailShowtime from '../DetailShowtime';

TableMovie.propTypes = {
  isModalVisibleUpdate: PropTypes.bool,
  isModalVisibleDetailShowtime: PropTypes.bool,
  isPendingListMovie: PropTypes.bool,
  isPendingInformationMovie: PropTypes.bool,
  isPendingInformationShowtime: PropTypes.bool,
  listMovie: PropTypes.array,
  handleConfirmDelete: PropTypes.func,
  handleConfirmUpdate: PropTypes.func,
  handleConfirmDetailShowtime: PropTypes.func,
};

function TableMovie(props) {
  //State modal ant design
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [isModalVisibleDetailShowtime, setIsModalVisibleDetailShowtime] = useState(false);

  const dispatch = useDispatch();

  const listMovie = useSelector((state) => state.manageMovie.listMovie);
  const isPendingListMovie = useSelector((state) => state.manageMovie.isPendingListMovie);
  const isPendingInformationMovie = useSelector(
    (state) => state.manageMovie.isPendingInformationMovie
  );
  const isPendingInformationShowtime = useSelector(
    (state) => state.manageMovie.isPendingInformationShowtime
  );

  useEffect(() => {
    const getListMovie = async () => {
      dispatch(await getListMovieAsync());
    };

    getListMovie();
  }, []);

  const handleConfirmDelete = async (maPhim) => {
    dispatch(await deleteMovieAsync(maPhim));
  };

  const handleConfirmUpdate = async (maPhim) => {
    setIsModalVisibleUpdate(true);
    dispatch(await getInformationMovieAsync(maPhim));
  };

  const handleConfirmDetailShowtime = async (maPhim) => {
    setIsModalVisibleDetailShowtime(true);
    dispatch(await getInformationShowtimeAsync(maPhim));
  };

  const columns = [
    {
      title: 'M?? phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: 110,
      sorter: (a, b) => {
        if (a.maPhim < b.maPhim) return -1;
        if (b.maPhim < a.maPhim) return 1;
        return 0;
      },
      render: (maPhim) => <span className="table-movie__text">{maPhim}</span>,
    },
    {
      title: 'T??n phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: 200,
      render: (tenPhim) => <span className="table-movie__text">{tenPhim}</span>,
    },
    {
      title: 'Trailer',
      dataIndex: 'trailer',
      key: 'trailer',
      width: 220,
      ellipsis: {
        showTitle: true,
      },
      render: (trailer) => (
        <span className="table-movie__text table-movie__text--ellipsis-1">{trailer}</span>
      ),
    },
    {
      title: 'H??nh ???nh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: 150,
      render: (hinhAnh) => <img src={hinhAnh} alt={hinhAnh} className="table-movie__image" />,
    },
    {
      title: 'M?? t???',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 350,
      ellipsis: {
        showTitle: true,
      },
      render: (moTa) => (
        <span className="table-movie__text table-movie__text--ellipsis-3">{moTa}</span>
      ),
    },
    {
      title: 'Ng??y kh???i chi???u',
      dataIndex: 'ngayKhoiChieu',
      key: 'ngayKhoiChieu',
      width: 150,
      render: (ngayKhoiChieu) => (
        <span className="table-movie__text">{moment(ngayKhoiChieu).format('DD-MM-YYYY')}</span>
      ),
    },
    {
      title: '????nh gi??',
      dataIndex: 'danhGia',
      key: 'danhGia',
      width: 150,
      render: (danhGia) => <Rate allowHalf disabled defaultValue={danhGia / 2} />,
    },
    {
      title: 'T??c v???',
      key: 'tacVu',
      render: (record) => {
        return (
          <div className="table-movie__task">
            <Popconfirm
              title="C???p nh???t th??ng tin?"
              okText="C??"
              cancelText="H???y"
              icon={<ExclamationCircleOutlined style={{ color: '#373a6d' }} />}
              onConfirm={() => handleConfirmUpdate(record.maPhim)}
            >
              <EditOutlined className="table-movie__icon" />
            </Popconfirm>

            <Popconfirm
              title={`X??a phim ${record.tenPhim}?`}
              icon={<ExclamationCircleOutlined style={{ color: '#FF3224' }} />}
              okText="C??"
              okType="danger"
              cancelText="Kh??ng"
              onConfirm={() => handleConfirmDelete(record.maPhim)}
            >
              <DeleteOutlined className="table-movie__icon" />
            </Popconfirm>
            <Popconfirm
              title={`Xem l???ch chi???u ${record.tenPhim}?`}
              icon={<ExclamationCircleOutlined style={{ color: '#009975' }} />}
              okText="C??"
              okType="primary"
              cancelText="Kh??ng"
              onConfirm={() => handleConfirmDetailShowtime(record.maPhim)}
            >
              <MoreOutlined className="table-movie__icon" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isPendingListMovie ? (
        <div className="table-movie__spinner"></div>
      ) : (
        <Table
          columns={columns}
          dataSource={listMovie}
          rowKey={(e) => e.maPhim}
          bordered
          scroll={{ y: 650 }}
        />
      )}

      <Modal
        title="C???p nh???t th??ng tin phim"
        visible={isModalVisibleUpdate}
        onCancel={() => setIsModalVisibleUpdate(false)}
        footer={null}
        closeIcon={<CloseOutlined className="table-movie__icon" />}
        centered
        width={800}
      >
        {isPendingInformationMovie ? (
          <div className="table-movie__spinner"></div>
        ) : (
          <FormEditMovie></FormEditMovie>
        )}
      </Modal>

      <Modal
        title="L???ch chi???u theo phim"
        visible={isModalVisibleDetailShowtime}
        onCancel={() => setIsModalVisibleDetailShowtime(false)}
        footer={null}
        closeIcon={<CloseOutlined className="table-movie__icon" />}
        centered
        width={1400}
      >
        {isPendingInformationShowtime ? (
          <div className="table-movie__spinner"></div>
        ) : (
          <DetailShowtime></DetailShowtime>
        )}
      </Modal>
    </>
  );
}

export default TableMovie;
