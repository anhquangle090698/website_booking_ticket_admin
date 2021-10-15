import React from 'react';
import { Layout } from 'antd';
import CHeader from 'components/CHeader';
import CSider from 'components/CSider';

const { Content } = Layout;

function Home(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CHeader></CHeader>
      <Content>
        <Layout className="site-layout-background" style={{ minHeight: `calc(100vh - 64px)` }}>
          <CSider></CSider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <div className="home">
              <h3 className="home__text">Website quản lý đặt vé xem phim G2 Cinema</h3>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Home;
