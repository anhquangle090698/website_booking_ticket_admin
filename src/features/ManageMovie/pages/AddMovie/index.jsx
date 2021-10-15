import React from 'react';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';
import { Layout } from 'antd';
import FormAddMovie from 'features/ManageMovie/components/FormAddMovie';

const { Content } = Layout;

function AddMovie(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <h3 className="h3-title">Thêm Phim</h3>
            <FormAddMovie></FormAddMovie>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default AddMovie;
