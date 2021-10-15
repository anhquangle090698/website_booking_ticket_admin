import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, DatePicker, Alert, Rate, Image, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import { postUpdateMovieAsync } from 'features/ManageMovie/manageMoviesSlice';

FormEditMovie.propTypes = {
  informationMovie: PropTypes.object,
  showAlert: PropTypes.bool,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

function FormEditMovie(props) {
  const [form] = Form.useForm();

  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const informationMovie = useSelector((state) => state.manageMovie.informationMovie);

  useEffect(() => {
    form.setFieldsValue({
      idMovie: informationMovie?.maPhim,
      nameMovie: informationMovie?.tenPhim,
      aliases: informationMovie?.biDanh,
      trailer: informationMovie?.trailer,
      image: informationMovie?.hinhAnh,
      description: informationMovie?.moTa,
      datetime: moment(informationMovie?.ngayKhoiChieu),
      rate: informationMovie?.danhGia / 2,
      idGroup: informationMovie?.maNhom,
    });
  }, []);

  useEffect(() => {
    const timeOut = () => setTimeout(() => {
      setShowAlert(false);
    }, 4000);

    return () => {
      timeOut();
    };
  }, [showAlert]);

  const onFinish = async (values) => {
    const formatNgayKhoiChieu = moment(values.datetime).format('DD/MM/YYYY');

    const informationUpdate = {
      maPhim: Number(values.idMovie),
      tenPhim: values.nameMovie,
      biDanh: values.aliases,
      trailer: values.trailer,
      hinhAnh: values.image[0].originFileObj,
      moTa: values.description,
      maNhom: values.idGroup,
      ngayKhoiChieu: formatNgayKhoiChieu,
      danhGia: Number(values.rate * 2),
    };

    console.log('informationUpdate', informationUpdate);

    let formData = new FormData();
    for (let key in informationUpdate) {
      formData.append(key, informationUpdate[key]);
    }

    dispatch(await postUpdateMovieAsync(formData));

    setShowAlert(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 13,
    },
  };
  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Mã phim" name="idMovie">
          <Input disabled={true} />
        </Form.Item>

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
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập link trailer, vd: https://www.youtube.com/embed/......',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh hiện tại">
          <Image width={90} src={informationMovie.hinhAnh} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh thay đổi"
          valuePropName="file"
          getValueFromEvent={normFile}
          extra="Chọn hình ảnh nếu muốn thay đổi"
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
          <Input.TextArea rows={5} />
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

        <Form.Item name="rate" label="Đánh giá">
          <Rate allowHalf />
        </Form.Item>

        <Form.Item label="Bí danh" name="aliases" hidden={true}>
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

export default FormEditMovie;
