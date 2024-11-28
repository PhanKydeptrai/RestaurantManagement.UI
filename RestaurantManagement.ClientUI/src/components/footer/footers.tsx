import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Footer } = Layout;

const FooterPage = () => {
    return (
        <Layout>
            <Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#001529', color: 'white', padding: '20px 50px' }}>
                <div className="container">
                    <div className="row">
                        <Row justify="space-between" align="middle" gutter={16}>
                            {/* Left Section: Copyright */}
                            <Col>
                                <Text style={{ color: 'white' }}>© 2024 MyWebsite. All Rights Reserved.</Text>
                            </Col>

                            {/* Center Section: Links */}
                            <Col className="float-end">
                                <Space>
                                    <Text style={{ color: 'white' }}>3TK Team</Text>
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Footer>
        </Layout>
    );
};

export default FooterPage;
