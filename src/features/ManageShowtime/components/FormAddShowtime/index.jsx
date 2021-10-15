import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, DatePicker, Alert, Select, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { postCreateShowtimeAsync } from 'features/ManageShowtime/manageShowtimeSlice';

FormAddShowtime.propTypes = {
  showAlert: PropTypes.bool,
  listTheater: PropTypes.array,
  informationMovie: PropTypes.array,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  onReset: PropTypes.func,
};

function FormAddShowtime(props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [showAlert, setShowAlert] = useState(false);

  const listTheater = useSelector((state) => state.manageShowtime.listTheaterByIdCinema);
  const informationMovie = useSelector((state) => state.manageShowtime.informationMovieByNameMovie);

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      idMovie: informationMovie[0]?.maPhim,
    });
  });

  const onFinish = async (values) => {
    const formatNgayKhoiChieu = moment(values.datetime).format('DD/MM/YYYY HH:mm:ss');

    const informationAddShowtime = {
      maPhim: values.idMovie,
      ngayChieuGioChieu: formatNgayKhoiChieu,
      maRap: values.idTheater,
      giaVe: Number(values.fare),
    };

    dispatch(await postCreateShowtimeAsync(informationAddShowtime));

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

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const style = {
    paddingBottom: '30px',
  };

  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Mã phim"
          name="idMovie"
          style={style}
          rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
          extra="Đối với phim chưa có lịch chiếu, cần nhập mã phim. Với phim có lịch chiếu, mã phim hiển thị theo danh sách phim ở trên."
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="idTheater"
          label="Rạp"
          style={style}
          rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}
          extra="Vui lòng chọn cụm rạp để hiển thị rạp"
        >
          <Select
            placeholder="Vui lòng chọn rạp"
            dropdownClassName="table-showtime__dropdown"
            className="table-showtime__select"
          >
            {listTheater[0]?.danhSachRap?.map((lt) => {
              return (
                <Option key={lt.maRap} value={lt.maRap} className="table-showtime__option">
                  {lt.tenRap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày Khởi Chiếu"
          name="datetime"
          style={style}
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày khởi chiếu',
            },
          ]}
        >
          <DatePicker showTime={{ format: 'HH:mm' }} />
        </Form.Item>

        <Form.Item
          name="fare"
          label="Giá vé (VND)"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn giá vé',
            },
          ]}
          extra="3 loại giá vé: Thường, Vip, Deluxe"
        >
          <Radio.Group>
            <Radio value="55000">55.000</Radio>
            <Radio value="75000">75.000</Radio>
            <Radio value="150000">150.000</Radio>
          </Radio.Group>
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
            Thêm lịch chiếu
          </Button>
        </Form.Item>
      </Form>

      {showAlert ? <Alert message="Thêm lịch chiếu thành công!" type="success" showIcon /> : null}
    </>
  );
}

export default FormAddShowtime;
