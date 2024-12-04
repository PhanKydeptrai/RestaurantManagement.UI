import { Button, Card, Col, Row, Typography, Image } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import banner from "./../image/banner.png";
import imagemenu from "./../image/2.png";
import book from "./../image/book.png";
import imagecc from "./../image/3.png";
const { Title, Paragraph } = Typography;
const HomePage = () => {
    return (
        <>
            {/* banner */}
            <Content style={{ textAlign: 'center', margin: '20px 0' }}>
                <Image
                    width="80%"
                    src={banner}
                    alt="Banner Nhà Hàng"
                />
            </Content>
            {/* content */}
            <Content style={{ padding: '0 50px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="Món Ăn 1" src={imagemenu} />}
                        >
                            <Title level={4}>Thực đơn</Title>
                            <Paragraph>
                                Những món ăn đặc biệt, hương vị tuyệt vời, và các thành phần chính của nhà hàng, sẽ đem lại cho bạn những trải nghiệm ẩm thực tuyệt vời nhất.
                            </Paragraph>
                            <Link to={"/menu"}><Button type="primary">Ghé thăm ngay</Button>
                            </Link>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="Món Ăn 2" src={book} />}
                        >
                            <Title level={4}>Đặt bàn</Title>
                            <Paragraph>
                                Sử dụng đặt bàn để đặt chỗ trước, tránh tình trạng chờ đợi lâu, và đảm bảo bạn sẽ có chỗ ngồi khi đến nhà hàng. <br /> Đặt bàn ngay hôm nay!
                            </Paragraph>
                            <Link to={"/normalbook"}><Button type="primary">Đặt ngay</Button></Link>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="Món Ăn 3" src={imagecc} />}
                        >
                            <Title level={4}>Công cụ</Title>
                            <Paragraph>
                                Nơi bạn có thể tìm kiếm các thông tin cần thiết về đơn hàng của bạn, cũng như các chương trình khuyến mãi và ưu đãi đặc biệt đang chờ đón bạn.
                            </Paragraph>
                            <Link to="/voucher"><Button type="primary">Xem Thêm</Button></Link>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </>
    )
}

export default HomePage;