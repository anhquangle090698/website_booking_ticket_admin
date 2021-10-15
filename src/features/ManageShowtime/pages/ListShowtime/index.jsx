import React from 'react';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout } from 'antd';
import TableShowtime from 'features/ManageShowtime/components/TableShowtime';

const { Content } = Layout;

function ListShowtime(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <TableShowtime></TableShowtime>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default ListShowtime;
