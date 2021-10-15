import React from 'react';
import PropTypes from 'prop-types';
import logo_white from 'asset/images/logo_white.png';

import { Layout, Menu, Dropdown } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN_ADMIN, ADMIN_LOGIN } from 'utils/config';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <NavLink to="/admin/thong-tin-tai-khoan">Thông tin tài khoản</NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink
        to="/dang-nhap"
        onClick={() => {
          localStorage.removeItem(ADMIN_LOGIN);
          localStorage.removeItem(ACCESS_TOKEN_ADMIN);

          // dispatch(handleSignOut());
        }}
      >
        Đăng xuất
      </NavLink>
    </Menu.Item>
  </Menu>
);

function CHeader(props) {
  const login = useSelector((state) => state.login.informationLogin);

  const admin = useSelector((state) => state.admin.informationAdmin);
  
  return (
    <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="header__brand">
        <div className="header__logo">
          <NavLink to="/">
            <img src={logo_white} alt="logo" className="header__image" />
          </NavLink>
        </div>
        <NavLink to="/">
          <h3 className="header__name">G2 Cinema Admin</h3>
        </NavLink>
      </div>
      <div className="header__admin">
        <span className="header__welcome">Xin chào, {admin[0]?.hoTen ?? login.hoTen}</span>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <SettingOutlined className="header__icon"></SettingOutlined>
        </Dropdown>
      </div>
    </Header>
  );
}

CHeader.propTypes = {};

export default CHeader;
