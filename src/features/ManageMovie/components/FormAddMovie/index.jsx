import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, DatePicker, Alert, Rate, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { postAddMovieAsync } from 'features/ManageMovie/manageMoviesSlice';

FormAddMovie.propTypes = {
  showAlert: PropTypes.bool,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  onReset: PropTypes.func,
};

function FormAddMovie(props) {
  const [form] = Form.useForm();

  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      idGroup: 'GP03',
      rate: 5,
    });
  });

  const onFinish = async (values) => {
    const formatNgayKhoiChieu = moment(values.datetime).format('DD/MM/YYYY');

    const informationAdd = {
      maPhim: 0,
      tenPhim: values.nameMovie,
      biDanh: '',
      trailer: values.trailer,
      hinhAnh: values.image[0].originFileObj,
      moTa: values.description,
      maNhom: values.idGroup,
      ngayKhoiChieu: formatNgayKhoiChieu,
      danhGia: Number(values.rate * 2),
    };

    let formData = new FormData();
    for (let key in informationAdd) {
      formData.append(key, informationAdd[key]);
    }

    dispatch(await postAddMovieAsync(formData));

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
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
          label="T??n phim"
          name="nameMovie"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p t??n phim',
            },
            {
              max: 100,
              message: 'T??n phim t???i ??a 100 k?? t???',
            },
          ]}
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p link trailer',
            },
            {
              pattern:
                /^(https:\/\/www\.youtube\.com\/embed\/)[A-Za-z0-9+&@#\/%=~_\-|$\^\!\*\(\)\.\[\]]+/,
              message: 'Vui l??ng nh???p ????ng dinh d???ng, vd: https://www.youtube.com/embed/......',
            },
          ]}
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="H??nh ???nh thay ?????i"
          valuePropName="file"
          getValueFromEvent={normFile}
          extra="Ch???n h??nh ???nh"
          rules={[
            {
              required: true,
              message: 'Vui l??ng ch???n h??nh ???nh',
            },
          ]}
        >
          <Upload name="image" maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />} style={{ fontSize: '12px' }}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="M?? t???"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p m?? t???',
            },
          ]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item
          label="Ng??y Kh???i Chi???u"
          name="datetime"
          rules={[
            {
              required: true,
              message: 'Vui l??ng ch???n ng??y kh???i chi???u',
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="rate"
          label="????nh gi??"
          rules={[
            {
              required: true,
              message: 'Vui l??ng ch???n ????nh gi??',
            },
          ]}
          extra="M???c ?????nh ????nh gi?? 5 sao, n??n ch???n ????nh gi?? ph?? h???p"
        >
          <Rate allowHalf />
        </Form.Item>

        <Form.Item label="M?? nh??m" name="idGroup" hidden={true}>
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
            Th??m phim
          </Button>
        </Form.Item>
      </Form>

      {showAlert ? <Alert message="Th??m phim th??nh c??ng!" type="success" showIcon /> : null}
    </>
  );
}

export default FormAddMovie;
