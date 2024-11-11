import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmployeeDto } from "../../models/employeeDto";
import { GetDetailEmployee } from "../../services/employee-service";
import { Form, Input, Row, Col, Breadcrumb, Image, Spin } from "antd";

const DetailEmployeePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const [employee, setEmployee] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await GetDetailEmployee(userId as string);
                console.log(result);
                setEmployee(result);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <>
            {/* Breadcrumb navigation */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/employees">Employees</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* Employee details */}
            <Row gutter={16}>
                {/* Left Column: Profile image */}
                <Col span={24} md={6}>
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <Image
                            width={200}
                            src={
                                employee?.value.userImage ||
                                "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            }
                            alt="Employee"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                </Col>

                {/* Right Column: Employee Information */}
                <Col span={24} md={18}>
                    <div className="p-3 py-5">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                {/* First Name */}
                                <Col span={12}>
                                    <Form.Item label="First Name">
                                        <Input value={employee?.value.firstName} readOnly />
                                    </Form.Item>
                                </Col>

                                {/* Last Name */}
                                <Col span={12}>
                                    <Form.Item label="Last Name">
                                        <Input value={employee?.value.lastName} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                {/* Email */}
                                <Col span={24}>
                                    <Form.Item label="Email">
                                        <Input value={employee?.value.email} readOnly />
                                    </Form.Item>
                                </Col>

                                {/* Phone Number */}
                                <Col span={24}>
                                    <Form.Item label="Phone Number">
                                        <Input value={employee?.value.phoneNumber} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                {/* Gender */}
                                <Col span={12}>
                                    <Form.Item label="Gender">
                                        <Input value={employee?.value.gender} readOnly />
                                    </Form.Item>
                                </Col>

                                {/* Role */}
                                <Col span={12}>
                                    <Form.Item label="Role">
                                        <Input value={employee?.value.role} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default DetailEmployeePage;
