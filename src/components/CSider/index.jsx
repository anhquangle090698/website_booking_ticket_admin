import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { UserOutlined, DatabaseOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

function CSider(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const ref = useRef(null);

  return (
    <Sider
      className="site-layout-background"
      width={220}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ padding: '24px 0' }}
    >
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={''}
        defaultOpenKeys={''}
        style={{ height: '100%' }}
        ref={ref}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Quản lý người dùng">
          <Menu.Item key="1">
            <NavLink to="/quan-ly-nguoi-dung/danh-sach">Danh sách người dùng</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/quan-ly-nguoi-dung/them">Thêm người dùng</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<DatabaseOutlined />} title="Quản lý phim">
          <Menu.Item key="5">
            <NavLink to="/quan-ly-phim/danh-sach">Danh sách phim</NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/quan-ly-phim/them">Thêm phim</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<FieldTimeOutlined />} title="Quản lý lịch chiếu">
          <Menu.Item key="9">
            <NavLink to="/quan-ly-lich-chieu/danh-sach">Danh sách lịch chiếu</NavLink>
          </Menu.Item>
          <Menu.Item key="10">
            <NavLink to="/quan-ly-lich-chieu/them">Thêm lịch chiếu</NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

CSider.propTypes = {};

export default CSider;
