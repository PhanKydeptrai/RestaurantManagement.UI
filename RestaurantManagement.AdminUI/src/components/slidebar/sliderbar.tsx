import { AlertOutlined, BarcodeOutlined, ContainerOutlined, HomeOutlined, InsertRowAboveOutlined, InsertRowLeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoneyCollectOutlined, ShopOutlined, ShoppingOutlined, TableOutlined, TagOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Controller from "../../Controller";
import { EmployeeDto } from "../../models/employeeDto";
import axios from "axios";
import { Left } from "react-bootstrap/lib/Media";

const SliderBar = () => {
    const role = localStorage.getItem('role');
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const [account, setAccount] = useState<EmployeeDto | null>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('https://restaurantmanagement.azurewebsites.net/api/account/account-emp-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'
                    }
                });

                if (response.data?.value) {
                    setAccount(response.data.value);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }; fetchData();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Xóa tất cả dữ liệu trong sessionStorage
        navigate('/'); // Điều hướng đến trang đăng nhập sau khi logout
    };
    const menuItems = [
        { key: '1', icon: <HomeOutlined />, title: 'Dashboard', link: '/dashboard', role: ['Boss', 'Manager'] },
        { key: '2', icon: <UserOutlined />, title: 'Employee', link: '/employees', role: ['Boss'] },
        {
            key: 'sub1', icon: <ContainerOutlined />, title: 'Order',
            children: [
                { key: '3', icon: <ShoppingOutlined />, title: 'Ordering', link: '/orders' },
                { key: '4', icon: <ShopOutlined />, title: 'Booking', link: '/bookings' },
            ]
        },
        { key: '5', icon: <TagOutlined />, title: 'Category', link: '/categories' },
        { key: '6', icon: <UsergroupAddOutlined />, title: 'Customers', link: '/customers' },
        { key: '7', icon: <AlertOutlined />, title: 'Meals', link: '/meals' },
        {
            key: 'sub2', icon: <InsertRowAboveOutlined />, title: 'Table',
            children: [
                { key: '8', icon: <TableOutlined />, title: 'Table', link: '/tables' },
                { key: '9', icon: <InsertRowLeftOutlined />, title: 'Table Type', link: '/tabletypes' },
            ]
        },
        { key: '10', icon: <BarcodeOutlined />, title: 'Voucher', link: '/vouchers' },
        { key: '11', icon: <MoneyCollectOutlined />, title: 'Bills', link: '/bills' },
    ];
    const userMenu = (
        <Menu>
            <Menu.Item>
                <Link to="/account" style={{ textDecoration: 'none' }}>Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/log" style={{ textDecoration: 'none' }}>History</Link>
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
    );
    return (
        <Layout style={{ minHeight: '100vh' }}> {/* Layout with full page height */}
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh', position: 'fixed', left: 0, top: 0 }}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {menuItems.map(item => (
                        item.children ? (
                            <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
                                {item.children.map(subItem => (
                                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                                        <Link to={subItem.link} style={{ textDecoration: 'none' }}>
                                            {subItem.title}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.link} style={{ textDecoration: 'none' }}>
                                    {item.title}
                                </Link>
                            </Menu.Item>
                        )
                    ))}
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {/* Align "Nhum Nhum Restaurant" to the left */}
                    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Nhum Nhum Restaurant</span>
                    </div>
                    {/* Align user profile to the right */}
                    <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                        <a onClick={e => e.preventDefault()}>
                            <Space style={{ marginRight: 24 }}>
                                <Avatar src={account?.userImage || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} size={40} />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'calc(100vh - 64px)', // Content height minus the header
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Controller />
                </Content>
                <Footer className="footer" style={{
                    textAlign: 'center',
                    position: 'fixed',
                    left: '0',
                    bottom: '0',
                    width: '100%',
                    backgroundColor: '#f1f1f1',
                    padding: '10px 0'
                }}>
                    3TK Team ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default SliderBar;
