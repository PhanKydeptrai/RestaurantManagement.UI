import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderPage = () => {
    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', top: 0, left: 0, width: '100%' }}>
                {/* Logo nhà */}
                <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                    My Home
                </div>

                {/* Menu cho Đăng nhập, Đăng ký */}
                <Menu theme="dark" mode="horizontal" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                    <Menu.Item key="login">
                        <Link to={"/login"}>
                            <Button icon={<LoginOutlined />} type="link" style={{ color: 'white' }}>
                                Đăng nhập
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="register">
                        <Button icon={<UserAddOutlined />} type="link" style={{ color: 'white' }}>
                            Đăng ký
                        </Button>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};

export default HeaderPage;
