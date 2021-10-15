import React from 'react';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout } from 'antd';
import FormAddUser from 'features/ManageUser/components/FormAddUser';

const { Content } = Layout;

function AddUser(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <h3 className="h3-title">Thêm Người Dùng</h3>
            <FormAddUser></FormAddUser>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default AddUser;
