import React from 'react';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout } from 'antd';
import TableUser from 'features/ManageUser/components/TableUser';

const { Content } = Layout;

function ListUser(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <TableUser></TableUser>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default ListUser;
