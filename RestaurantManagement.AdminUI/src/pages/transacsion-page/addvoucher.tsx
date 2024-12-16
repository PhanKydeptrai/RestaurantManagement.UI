import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteOrder, GetOrderDetail, OrderPayCash, UpdateOrder } from "../../services/order-services";
import { toast, ToastContainer } from "react-toastify";
import { Button, Input, Table, Space, Typography, Form, Row, Col, Breadcrumb, TableColumnsType, notification, Card, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { OrderDetailDto } from "../../models/orderDto";
import { MakeVoucher } from "../../services/voucher-services";
import Meta from "antd/es/card/Meta";

const { Title } = Typography;

const AddvoucherForBill = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const [table, setTable] = useState<any>();
    const [dataSource, setDataSource] = useState<OrderDetailDto[]>([]);
    const navigate = useNavigate();
    const [voucherCode, setVoucherCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const isFormValid = voucherCode.trim() !== '' || phoneNumber.trim() !== '';
    // Lấy dữ liệu order detail khi page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOrderDetail(tableId as string);
                console.log(result);
                setTable(result);
                setDataSource(result?.value?.orderDetails || []); // Set dữ liệu ban đầu
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [tableId]);

    const handleAddVoucher = async (event: React.FormEvent) => {
        event.preventDefault();


        try {
            const voucherData = {
                voucherCode: voucherCode,
                phoneNumber: phoneNumber
            }
            console.log('Voucher data:', voucherData);
            if (tableId) {

                const response = await MakeVoucher(tableId, voucherData);
                console.log('Success', response);
                if (response?.isSuccess) {
                    notification.success({ message: 'Thêm thành công!', description: 'Voucher đã được thêm vào hóa đơn!' });
                    setTimeout(() => {
                        navigate(`/paymentInfo/${tableId}`);
                    }, 2000);
                } else {
                    notification.error({ message: 'Thêm thất bại', description: 'Đã xảy ra lỗi trong quá trình thực hiện. Vui lòng thử lại sau!' });
                }
            }
        } catch (error) {
            console.error("Error adding voucher:", error);
        }
    };

    // Cấu hình cột cho bảng
    const columns: TableColumnsType<OrderDetailDto> = [
        {
            title: "Meal Name",
            dataIndex: "mealName",
            key: "mealName",
        },
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl: string) => {
                return <img src={imageUrl} alt="Meal" style={{ width: 50, height: 50, objectFit: 'cover' }} />;
            }
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
        }
    ];

    return (
        <>
            <main>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/dashboard"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/orders/${tableId}`}>Order Detail</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Add Voucher
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <div className="container">
                    {/* Order Detail Form */}
                    <Row>
                        {/* Form thông tin */}
                        <Form style={{ width: '50%' }} layout="vertical">
                            <Form.Item label="Order Id">
                                <Input value={table?.value.orderId} readOnly />
                            </Form.Item>
                            <Form.Item label="Table Id">
                                <Input value={table?.value.tableId} readOnly />
                            </Form.Item>
                            <Form.Item label="Payment Status">
                                <Input value={table?.value.paymentStatus} readOnly />
                            </Form.Item>
                            <Form.Item label="Total">
                                <Input value={table?.value.total} readOnly />
                            </Form.Item>
                        </Form>

                        {/* Form nhập thông tin voucher */}
                        <Col span={12}>
                            <Card>
                                <Form layout="vertical" onSubmitCapture={handleAddVoucher}>
                                    <Form.Item label="Voucher Code">
                                        <Input
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value)}
                                            placeholder="Enter voucher code"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Phone Number">
                                        <Input
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Enter phone number"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={handleAddVoucher}
                                        >
                                            {isFormValid ? 'Add Voucher' : 'Next'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                    </Row>

                    {/* Order Details Table */}
                    <Title level={2}>Order Detail</Title>

                    <Table<OrderDetailDto>
                        columns={columns}
                        dataSource={dataSource}  // Sử dụng dataSource
                        rowKey="orderDetailId"
                        pagination={false}
                        bordered
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </main>
        </>
    );
};

export default AddvoucherForBill;
