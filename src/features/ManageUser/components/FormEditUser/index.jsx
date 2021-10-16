import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { putUpdateUserAsync } from 'features/ManageUser/manageUserSlice';

FormEditUser.propTypes = {
  showAlert: PropTypes.bool,
  checkShowPassword: PropTypes.bool,
  onFinish: PropTypes.func,
  onReset: PropTypes.func,
  onFinishFailed: PropTypes.func,
  onCheckboxChange: PropTypes.func,
};

function FormEditUser(props) {
  const [form] = Form.useForm();

  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const information = useSelector((state) => state.manageUser.informationSearchUser);

  useEffect(() => {
    form.setFieldsValue({
      username: information[0]?.hoTen,
      numberPhone: information[0]?.soDt,
      email: information[0]?.email,
      account: information[0]?.taiKhoan,
      role: information[0]?.maLoaiNguoiDung,
      idGroup: 'GP03',
      password: information[0]?.matKhau,
    });
  }, [information]);

  const onCheckboxChange = (e) => {
    setCheckShowPassword(e.target.checked);
  };

  const onFinish = async (values) => {
    const informationUpdate = {
      taiKhoan: values.account,
      matKhau: values.newPassword ?? information[0].matKhau,
      email: values.email,
      soDt: values.numberPhone,
      maNhom: values.idGroup,
      maLoaiNguoiDung: values.role,
      hoTen: values.username,
    };

    dispatch(await putUpdateUserAsync(informationUpdate));

    setShowAlert(true);
    setCheckShowPassword(false);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields(['oldPassword', 'newPassword', 'confirmPassword']);
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };

  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Họ tên"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên',
            },
            {
              min: 5,
              message: 'Họ tên có ít nhất 5 kí tự',
            },
            {
              max: 50,
              message: 'Họ tên không vượt quá 50 kí tự',
            },
            {
              pattern:
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
              message: 'Họ tên không chứa số và kí tự đặc biệt',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="numberPhone"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại',
            },
            {
              max: 10,
              message: 'Số điện thoại tối đa 10 kí tự',
            },
            {
              pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
              message: 'Nhập đúng định dạng, vd: 03xxxxxxxx, 05xxxxxxx, 08xxxxxxx',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="Tài khoản" name="account">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Checkbox checked={checkShowPassword} onChange={onCheckboxChange}>
            Thay đổi mật khẩu
          </Checkbox>
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu hiện tại"
          name="oldPassword"
          hidden={!checkShowPassword}
          dependencies={['password']}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui lòng nhập mật khẩu hiện tại',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu hiện tại không đúng'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          hidden={!checkShowPassword}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui lòng nhập mật khẩu',
            },
            {
              min: 10,
              message: 'Mật khẩu phải có ít nhất 10 kí tự',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
              message: 'Mật khẩu có ít nhất 1 kí tự hoa, 1 kí tự số, 1 kí tự đặc biệt',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          hidden={!checkShowPassword}
          dependencies={['newPassword']}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui lòng nhập xác nhận mật khẩu',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Mã loại người dùng" name="role" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="Mã nhóm" name="idGroup" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>

      {showAlert ? (
        <Alert message="Cập nhật thông tin thành công!" type="success" showIcon />
      ) : null}
    </>
  );
}

export default FormEditUser;
