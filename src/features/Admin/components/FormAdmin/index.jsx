import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInformationAdminAsync, putUpdateAdminAsync } from 'features/Admin/adminSlice';

FormAdmin.propTypes = {
  checkShowPassword: PropTypes.bool,
  showAlert: PropTypes.bool,
  informationLogin: PropTypes.object,
  informationAdmin: PropTypes.array,
  onCheckboxChange: PropTypes.func,
  onFinish: PropTypes.func,
  onReset: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

function FormAdmin(props) {
  const [form] = Form.useForm();

  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  //Without password
  const informationLogin = useSelector((state) => state.login.informationLogin);

  //With password
  const informationAdmin = useSelector((state) => state.admin.informationAdmin);

  useEffect(() => {
    const postInformationAdmin = async () => {
      dispatch(await getInformationAdminAsync(informationLogin.taiKhoan));
    };

    postInformationAdmin();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      username: informationAdmin[0]?.hoTen,
      numberPhone: informationAdmin[0]?.soDt,
      email: informationAdmin[0]?.email,
      account: informationAdmin[0]?.taiKhoan,
      role: informationAdmin[0]?.maLoaiNguoiDung,
      idGroup: 'GP03',
      password: informationAdmin[0]?.matKhau,
    });
  }, [informationAdmin]);

  const onCheckboxChange = (e) => {
    setCheckShowPassword(e.target.checked);
  };

  const onFinish = async (values) => {
    const informationUpdate = {
      taiKhoan: values.account,
      matKhau: values.newPassword ?? informationAdmin[0].matKhau,
      email: values.email,
      soDt: values.numberPhone,
      maNhom: values.idGroup,
      maLoaiNguoiDung: values.role,
      hoTen: values.username,
    };

    dispatch(await putUpdateAdminAsync(informationUpdate));

    setShowAlert(true);
    setCheckShowPassword(false);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    onReset();
  };

  const onReset = () => {
    form.resetFields(['oldPassword', 'newPassword', 'confirmPassword']);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          label="H??? t??n"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p h??? t??n',
            },
            {
              min: 5,
              message: 'H??? t??n c?? ??t nh???t 5 k?? t???',
            },
            {
              max: 50,
              message: 'H??? t??n kh??ng v?????t qu?? 50 k?? t???',
            },
            {
              pattern:
                /^[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s\W|_]+$/,
              message: 'H??? t??n kh??ng ch???a s??? v?? k?? t??? ?????c bi???t',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="S??? ??i???n tho???i"
          name="numberPhone"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p s??? ??i???n tho???i',
            },
            {
              max: 10,
              message: 'S??? ??i???n tho???i t???i ??a 10 k?? t???',
            },
            {
              pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
              message: 'Nh???p ????ng ?????nh d???ng, vd: 03xxxxxxxx, 05xxxxxxx, 08xxxxxxx',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="T??i kho???n" name="account">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Checkbox checked={checkShowPassword} onChange={onCheckboxChange}>
            Thay ?????i m???t kh???u
          </Checkbox>
        </Form.Item>

        <Form.Item label="M???t kh???u" name="password" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          label="M???t kh???u hi???n t???i"
          name="oldPassword"
          hidden={!checkShowPassword}
          dependencies={['password']}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui l??ng nh???p m???t kh???u hi???n t???i',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('M???t kh???u hi???n t???i kh??ng ????ng'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="M???t kh???u m???i"
          name="newPassword"
          hidden={!checkShowPassword}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui l??ng nh???p m???t kh???u',
            },
            {
              min: 10,
              message: 'M???t kh???u ph???i c?? ??t nh???t 10 k?? t???',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
              message: 'M???t kh???u c?? ??t nh???t 1 k?? t??? hoa, 1 k?? t??? s???, 1 k?? t??? ?????c bi???t',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="X??c nh???n m???t kh???u"
          name="confirmPassword"
          hidden={!checkShowPassword}
          dependencies={['newPassword']}
          rules={[
            {
              required: checkShowPassword,
              message: 'Vui l??ng nh???p x??c nh???n m???t kh???u',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('M???t kh???u kh??ng tr??ng kh???p'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="M?? lo???i ng?????i d??ng" name="role" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="M?? nh??m" name="idGroup" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            C???p nh???t
          </Button>
        </Form.Item>
      </Form>

      {showAlert ? (
        <Alert message="C???p nh???t th??ng tin th??nh c??ng!" type="success" showIcon />
      ) : null}
    </>
  );
}

export default FormAdmin;
