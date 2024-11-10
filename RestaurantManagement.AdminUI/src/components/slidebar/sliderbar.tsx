import { AlertOutlined, BarcodeOutlined, ContainerOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoneyCollectOutlined, ShopOutlined, ShoppingOutlined, TableOutlined, TagOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faClipboardList, faFileInvoiceDollar, faHome, faPercent, faSolarPanel, faTags, faUser, faUsers, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide } from "react-toastify";
import Controller from "../../Controller";

const SliderBar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const menuItems = [
        { key: '1', icon: <HomeOutlined />, title: 'Dashboard', link: '/dashboard' },
        { key: '2', icon: <UserOutlined />, title: 'Employee', link: '/employees' },
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
        { key: '8', icon: <TableOutlined />, title: 'Table', link: '/tables' },
        { key: '9', icon: <BarcodeOutlined />, title: 'Voucher', link: '/vouchers' },
        { key: '10', icon: <MoneyCollectOutlined />, title: 'Bills', link: '/bills' },

    ]
    const navigate = useNavigate();



    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {menuItems.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.link as string}>{item.title}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
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
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Controller></Controller>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )

}

export default SliderBar;
