import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Space, theme, Carousel, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const items = [
    { key: '1', label: 'Home', link: '/' },
    { key: '2', label: 'Menu', link: '/menu' },
    { key: '3', label: 'Booking', link: '/formforNomal' },
    { key: '4', label: 'Contact', link: '/contact' },
];

const LandingPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Check login status when the component renders
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <Layout>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px',
                    }}
                >
                    {/* Logo */}
                    <div className="demo-logo" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                        Logo
                    </div>

                    {/* Menu */}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ flex: 1, minWidth: 0, marginLeft: '20px' }}
                    >
                        {items.map(item => (
                            <Menu.Item key={item.key}>
                                <Link to={item.link}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>

                    {/* Login / Register / Profile / Logout buttons */}
                    <Space>
                        {!isLoggedIn ? (
                            <>
                                <Button type="link" style={{ color: 'white' }}>
                                    <Link to="/login">Đăng nhập</Link>
                                </Button>
                                <Button type="primary">
                                    <Link to="/register">Đăng ký</Link>
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

                <Content style={{ padding: 0 }}>
                    {/* Full-width Landing Page Image */}
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <Image
                            src="https://picgroup.vn/wp-content/uploads/2020/04/H%C3%8CNH-5.jpg"
                            alt="Landing Page Image"
                            preview={false}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="row mt-5"></div>
                </Content>

                <Footer
                    className="footer"
                    style={{
                        textAlign: 'center',
                        position: 'fixed',
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: '#f1f1f1',
                        padding: '10px 0',
                    }}
                >
                    3TK Team ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </>
    );
};

export default LandingPage;
