import { Carousel, Layout, Image, Row, Col, Card, Typography, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../header/headers";
import FooterPage from "../footer/footers";
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import ControllerPage from "../../Controller";


const { Title, Paragraph } = Typography;
const ContentPage = () => {
    return (
        <Layout>
            <HeaderPage />
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <Carousel autoplay>
                    <div>
                        <h3 style={{ color: '#fff', textAlign: 'center', fontSize: '36px' }}>
                            Khám phá Ẩm Thực Tuyệt Vời
                        </h3>
                    </div>
                    <div>
                        <h3 style={{ color: '#fff', textAlign: 'center', fontSize: '36px' }}>
                            Thực Đơn Đa Dạng, Hương Vị Đặc Sắc
                        </h3>
                    </div>
                    <div>
                        <h3 style={{ color: '#fff', textAlign: 'center', fontSize: '36px' }}>
                            Đến Ngay Để Thưởng Thức!
                        </h3>
                    </div>
                </Carousel>
            </Content>

            {/* them controller */}
            <Row style={{ margin: '20px' }}>
                <ControllerPage />
            </Row>
            {/* contact */}
            <Content style={{ backgroundColor: '#f0f2f5', padding: '50px 0' }}>
                <Row justify="center">
                    <Col span={12}>
                        <Title level={2}>Liên Hệ</Title>
                        <Paragraph>
                            Chúng tôi rất mong được đón tiếp bạn. Đừng ngần ngại liên hệ với chúng tôi qua các phương thức dưới đây:
                        </Paragraph>
                        <div>
                            <Button icon={<PhoneOutlined />} style={{ marginRight: '10px' }}>
                                (+84) 123 456 789
                            </Button>
                            <Button icon={<MailOutlined />} style={{ marginRight: '10px' }}>
                                info@nhahangabc.com
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Content>
            <FooterPage />
        </Layout>
    );
};

export default ContentPage;
