import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Tabs, Table } from 'antd';

DetailShowtime.propTypes = {
  informationShowtime: PropTypes.object
};

function DetailShowtime(props) {
  const { TabPane } = Tabs;

  const informationShowtime = useSelector((state) => state.manageMovie.informationShowtime);

  const columns = [
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
  ];
  
  return (
    <>
      <Tabs tabPosition="left">
        {informationShowtime?.heThongRapChieu?.map((htrc, index) => {
          return (
            <TabPane
              tab={
                <img
                  src={htrc.logo}
                  alt={htrc.logo}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                ></img>
              }
              key={htrc.maHeThongRap}
            >
              <Tabs>
                {htrc.cumRapChieu.map((crc, index) => {
                  return (
                    <TabPane tab={crc.tenCumRap} key={crc.maCumRap}>
                      <Table
                        columns={columns}
                        dataSource={crc.lichChieuPhim}
                        rowKey={(e) => e.maLichChieu}
                        bordered
                        scroll={{ y: 650 }}
                      />
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
}

export default DetailShowtime;
