import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAsync,
  getAllUserAsync,
  getSearchUserAsync,
} from 'features/ManageUser/manageUserSlice';
import { Table, Popconfirm, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import FormEditUser from '../FormEditUser';

TableUser.propTypes = {
  isModalVisible: PropTypes.bool,
  listUser: PropTypes.array,
  isPending: PropTypes.bool,
  handleConfirmDelete: PropTypes.func,
  handleConfirmUpdate: PropTypes.func,
};

function TableUser(props) {
  //State modal ant design
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const listUser = useSelector((state) => state.manageUser.listUser);
  const isPending = useSelector((state) => state.manageUser.isPending);

  useEffect(() => {
    const getAllUser = async () => {
      dispatch(await getAllUserAsync());
    };

    getAllUser();
  }, []);

  const handleConfirmDelete = async (taiKhoan) => {
    dispatch(await deleteUserAsync(taiKhoan));
  };

  const handleConfirmUpdate = async (taiKhoan) => {
    setIsModalVisible(true);
    dispatch(await getSearchUserAsync(taiKhoan));
  };

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 250,
      sorter: (a, b) => {
        if (a.hoTen < b.hoTen) return -1;
        if (b.hoTen < a.hoTen) return 1;
        return 0;
      },
      render: (hoTen) => <span className="table-user__text">{hoTen}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email) => <span className="table-user__text">{email}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      width: 180,
      render: (soDt) =>
        soDt === '' || !soDt ? '...' : <span className="table-user__text">{soDt}</span>,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: 260,
      render: (taiKhoan) => <span className="table-user__text">{taiKhoan}</span>,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
      width: 240,
      render: (matKhau) => <span className="table-user__text">{matKhau}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: 150,
      render: (maLoaiNguoiDung) => <span className="table-user__text">{maLoaiNguoiDung}</span>,
      filters: [
        {
          text: 'Quản Trị',
          value: 'QuanTri',
        },
        {
          text: 'Khách Hàng',
          value: 'KhachHang',
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    {
      title: 'Tác vụ',
      key: 'tacVu',
      render: (record) => {
        return (
          <div className="table-user__task">
            <Popconfirm
              title="Cập nhật thông tin?"
              okText="Có"
              cancelText="Hủy"
              onConfirm={() => handleConfirmUpdate(record.taiKhoan)}
            >
              <EditOutlined className="table-user__icon" />
            </Popconfirm>

            <Popconfirm
              title={`Xóa tài khoản ${record.taiKhoan}?`}
              icon={<ExclamationCircleOutlined style={{ color: '#FF3224' }} />}
              okText="Có"
              okType="danger"
              cancelText="Không"
              onConfirm={() => handleConfirmDelete(record.taiKhoan)}
            >
              <DeleteOutlined className="table-user__icon" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  //   pagination={{ pageSize: 50 }} scroll={{ y: 700 }} fixed header
  return (
    <>
      {isPending ? (
        <div className="table-user__spinner"></div>
      ) : (
        <Table columns={columns} dataSource={listUser} rowKey={(e) => e.taiKhoan} bordered />
      )}
      <Modal
        title="Cập nhật thông tin người dùng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        closeIcon={<CloseOutlined className="table-user__icon" />}
        centered
        width={800}
      >
        <FormEditUser></FormEditUser>
      </Modal>
    </>
  );
}

export default TableUser;
