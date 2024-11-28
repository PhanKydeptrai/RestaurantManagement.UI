import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Footer } = Layout;

const FooterPage = () => {
    return (
        <Layout>
            <Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#001529', color: 'white', padding: '20px 50px' }}>
                <Row justify="space-between" align="middle" gutter={16}>
                    {/* Left Section: Copyright */}
                    <Col>
                        <Text style={{ color: 'white' }}>© 2024 MyWebsite. All Rights Reserved.</Text>
                    </Col>

                    {/* Center Section: Links */}
                    <Col>
                        <Space>
                            <Text style={{ color: 'white' }}>Privacy Policy</Text>
                            <Text style={{ color: 'white' }}>Terms of Service</Text>
                        </Space>
                    </Col>

                    {/* Right Section: Social Media Icons */}
                    <Col>
                        <Space>
                            <FacebookOutlined style={{ color: 'white', fontSize: '20px' }} />
                            <TwitterOutlined style={{ color: 'white', fontSize: '20px' }} />
                            <InstagramOutlined style={{ color: 'white', fontSize: '20px' }} />
                        </Space>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default FooterPage;
