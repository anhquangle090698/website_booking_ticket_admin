import React from 'react';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout } from 'antd';
import FormAdmin from 'features/Admin/components/FormAdmin';

const { Content } = Layout;

function InformationAdmin(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <h3 className="h3-title">Thông Tin Quản Trị</h3>
            <FormAdmin></FormAdmin>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default InformationAdmin;
