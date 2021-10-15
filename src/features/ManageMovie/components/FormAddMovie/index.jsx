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
  }, []);

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
          label="Tên phim"
          name="nameMovie"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên phim',
            },
            {
              max: 100,
              message: 'Tên phim tối đa 100 kí tự',
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
              message: 'Vui lòng nhập link trailer',
            },
            {
              pattern:
                /^(https:\/\/www\.youtube\.com\/embed\/)[A-Za-z0-9+&@#\/%=~_\-|$\^\!\*\(\)\.\[\]]+/,
              message: 'Vui lòng nhập đúng dinh dạng, vd: https://www.youtube.com/embed/......',
            },
          ]}
          style={style}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh thay đổi"
          valuePropName="file"
          getValueFromEvent={normFile}
          extra="Chọn hình ảnh"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn hình ảnh',
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
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả',
            },
          ]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item
          label="Ngày Khởi Chiếu"
          name="datetime"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày khởi chiếu',
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="rate"
          label="Đánh giá"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn đánh giá',
            },
          ]}
          extra="Mặc định đánh giá 5 sao, nên chọn đánh giá phù hợp"
        >
          <Rate allowHalf />
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
            Thêm phim
          </Button>
        </Form.Item>
      </Form>

      {showAlert ? <Alert message="Thêm phim thành công!" type="success" showIcon /> : null}
    </>
  );
}

export default FormAddMovie;
