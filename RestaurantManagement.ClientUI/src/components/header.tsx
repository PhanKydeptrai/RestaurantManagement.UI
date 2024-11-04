import React from 'react';
import { Layout, Avatar, Menu } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/es/menu/SubMenu';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    padding: '0 20px',
    backgroundColor: '#001529'
};

const avatarStyle: React.CSSProperties = {
    backgroundColor: '#1890ff',
    marginRight: '10px'
};

const menuStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: 'transparent',
    lineHeight: '64px'
};

const menuItemsStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '0 10px'
};
const iconStyle: React.CSSProperties = {
    fontSize: '16px', // Đặt fontSize cho icon bằng với menuItems
    marginRight: '10px',
    fontWeight: 'bold',
};

const HeaderComponent = () => {
    return (
        <Header style={headerStyle}>
            <Avatar
                size={40}
                icon={<AntDesignOutlined />}
                style={avatarStyle}
            />
            <Menu mode="horizontal" theme="dark" style={menuStyle}>
                <Menu.Item key="home" style={menuItemsStyle}>
                    <Link to='/'></Link>Home
                </Menu.Item>
                <Menu.Item key="menu" style={menuItemsStyle}>
                    <Link to='/menu'></Link>Menu
                </Menu.Item>
                <Menu.Item key="book" style={menuItemsStyle}>
                    <Link to='/book'></Link>Book
                </Menu.Item>
                <Menu.Item key="about" style={menuItemsStyle}>
                    <Link to='/about'></Link>About
                </Menu.Item>
            </Menu>
            <Menu mode="horizontal" theme="dark">
                <SubMenu key="user" icon={<UserOutlined style={iconStyle} />} title="">
                    <Menu.Item key="login" style={menuItemsStyle}>
                        <Link to='/login'></Link>Login
                    </Menu.Item>
                    <Menu.Item key="signin" style={menuItemsStyle}>
                        <Link to='/register'></Link>Sign In
                    </Menu.Item>
                </SubMenu>
            </Menu>



        </Header>
    );
}

export default HeaderComponent;