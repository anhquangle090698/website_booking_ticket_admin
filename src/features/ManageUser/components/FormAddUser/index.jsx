import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Alert, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postAddUserAsync } from 'features/ManageUser/manageUserSlice';

FormAddUser.propTypes = {
  showAlert: PropTypes.bool,
  isCheckAdd: PropTypes.string,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

function FormAddUser(props) {
  const [form] = Form.useForm();

  const [showAlert, setShowAlert] = useState(false);

  const isCheckAdd = useSelector((state) => state.manageUser.isCheckAdd);

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      idGroup: 'GP03',
    });
  });

  const onFinish = async (values) => {
    const informationAdd = {
      taiKhoan: values.account,
      matKhau: values.password,
      email: values.email,
      soDt: values.numberPhone,
      maNhom: values.idGroup,
      maLoaiNguoiDung: values.role,
      hoTen: values.username,
    };

    dispatch(await postAddUserAsync(informationAdd));

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const style = {
    paddingBottom: '20px',
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
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
              message: 'Họ tên không chứa số và kí tự đặc biệt',
            },
          ]}
          style={style}
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
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
            {
              pattern: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
              message: 'Nhập đúng định dạng, vd: abc@gmail.com, xyz@outlook.com.vn',
            },
          ]}
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tài khoản"
          name="account"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tài khoản',
            },
            {
              min: 7,
              message: 'Tài khoản phải có ít nhất 7 kí tự',
            },
            {
              max: 50,
              message: 'Tài khoản có tối đa 50 kí tự',
            },
            {
              pattern:
                /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
              message: 'Tài khoản không chứa kí tự đặc biệt và khoảng trắng',
            },
          ]}
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
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
          style={style}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xác nhận mật khẩu',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
              },
            }),
          ]}
          style={style}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mã loại người dùng"
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn mã loại người dùng' }]}
          style={style}
        >
          <Radio.Group>
            <Radio value="KhachHang">Khách Hàng</Radio>
            <Radio value="QuanTri">Quản Trị</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Mã nhóm" name="idGroup" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 20,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: '30px',
            }}
          >
            Tạo người dùng
          </Button>
        </Form.Item>
      </Form>

      {showAlert && isCheckAdd === '' ? (
        <Alert message="Tạo người dùng mới thành công!" type="success" showIcon />
      ) : showAlert && isCheckAdd !== '' ? (
        <Alert message={isCheckAdd} type="error" showIcon />
      ) : null}
    </>
  );
}

export default FormAddUser;
