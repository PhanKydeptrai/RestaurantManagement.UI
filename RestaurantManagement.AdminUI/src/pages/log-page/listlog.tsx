import { Breadcrumb, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";

const ListLogHistoryPage = () => {

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/log"><td>Log</td></Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* Thêm Row chứa các nút, chia cột responsive */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Link to='/log/historyemployee'><Button type="primary" style={{ width: '100%' }}>Employee</Button></Link>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Customer</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 3</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 4</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 5</Button>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 6</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 7</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 8</Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Button type="primary" style={{ width: '100%' }}>Button 9</Button>
                </Col>
            </Row>
        </>
    )
}

export default ListLogHistoryPage;
