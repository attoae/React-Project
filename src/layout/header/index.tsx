import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg'
import './style.scss'

const { Header } = Layout;

const AppHeader: React.FC<{}> = (props) => {
  return (
    <Header className="app-header">
        <div className="logo">
          <img
            className="logo-img"
            src={logo}
            alt="logo-img"
          />
        </div>
        <Menu 
          className="menu"
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span className="title">管理员</span>
          </Menu.Item>
          <Menu.Item key="2">退出</Menu.Item>
        </Menu>
    </Header>
  )
}

export default AppHeader;
