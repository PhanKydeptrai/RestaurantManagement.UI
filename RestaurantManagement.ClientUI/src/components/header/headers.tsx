import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    // Check login status when the component renders
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', top: 0, left: 0, width: '100%' }}>
                {/* Logo nhà */}
                <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>NHUM NHUM Restaurant</Link>
                </div>

                <Space>
                    {!isLoggedIn ? (
                        <>
                            <Button type="link" style={{ color: 'white' }}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>Đăng nhập</Link>
                            </Button>
                            <Button type="primary" style={{ color: 'white' }}>
                                <Link to="/register" style={{ textDecoration: 'none' }}>Đăng ký</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button type="link" style={{ color: 'white' }}>
                                <Link to="/account">Trang cá nhân</Link>
                            </Button>
                            <Button type="link" style={{ color: 'white' }} onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    )}
                </Space>
            </Header>
        </Layout>
    );
};

export default HeaderPage;
