import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OrderPayCash, OrderPayVNPay } from "../../services/order-services";
import { ToastContainer } from "react-toastify";
import { Button, Input, Table, Typography, Form, Row, Col, Breadcrumb, TableColumnsType, notification } from "antd";
import { OrderDetailDto } from "../../models/orderDto";
import { MakePayment } from "../../services/voucher-services";
import { RemoveTransaction } from "../../services/statistics-services";

const { Title } = Typography;

const OrderDetailPage = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const [table, setTable] = useState<any>();
    const [dataSource, setDataSource] = useState<OrderDetailDto[]>([]);
    const navigate = useNavigate();

    // Lấy dữ liệu order detail khi page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await MakePayment(tableId as string);
                setTable(result);
                setDataSource(result?.value?.orderDetails || []);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [tableId]);

    const handleCash = async (tableId: string) => {
        try {
            console.log("Updating order: ", tableId);
            const response = await OrderPayCash(tableId);
            if (response?.isSuccess) {
                notification.success({
                    message: 'Thanh toán thành công!',
                    description: 'Đơn hàng của bạn đã được thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!'
                });
                setTimeout(() => {
                    navigate('/bills');
                }, 2000);
            } else {
                notification.error({ message: 'Thanh toán thất bại', description: 'Đơn hàng của bạn chưa được thanh toán. Vui lòng thử lại sau!' });
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const handleVNPay = async (tableId: string) => {
        try {
            console.log("Updating order: ", tableId);
            const response = await OrderPayVNPay(tableId);
            window.open(`https://localhost:7057/api/orders/vn-pay/${tableId}`);
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const handleDelete = async (tableId: string) => {
        try {
            console.log("Deleting order: ", tableId);
            const response = await RemoveTransaction(tableId);
            if (response?.isSuccess) {
                notification.success({ message: 'Huỷ thanh toán thành công', description: 'Đơn hàng của bạn đã được huỷ thành công. Vui lòng kiểm tra lại thông tin đơn hàng trước khi thực hiện thanh toán' });
                setTimeout(() => {
                    navigate('/orders');
                }, 2000);
            } else {
                notification.error({ message: 'Huỷ đơn hàng thất bại!', description: 'Đơn hàng của bạn chưa được huỷ. Vui lòng thử lại sau!' });
            }
        } catch (error) {
            console.error("Error deleting order:", error);
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
                                <Link to="/"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Order</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <div className="container">
                    {/* Order Detail Form */}
                    <Form layout="vertical">
                        <Form.Item label="Order Id">
                            <Input value={table?.value.orderId} readOnly />
                        </Form.Item>
                        <Form.Item label="Table Id">
                            <Input value={table?.value.tableId} readOnly />
                        </Form.Item>
                        <Form.Item label="Payment Status">
                            <Input value={table?.value.paymentStatus} readOnly />
                        </Form.Item>
                        <Form.Item label="Discount">
                            <Input value={table?.value.voucherCode} readOnly />
                        </Form.Item>
                        <Form.Item label="Total">
                            <Input value={table?.value.total} readOnly />
                        </Form.Item>
                    </Form>

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

                    {/* Payment and Cancel Buttons */}
                    <div style={{ marginTop: 20 }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8} md={6} lg={5}>
                                <Button
                                    type="primary"
                                    danger
                                    block
                                    onClick={() => handleDelete(tableId as string)}
                                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                                >
                                    Huỷ đơn hàng
                                </Button>
                            </Col>
                            <Col xs={24} sm={8} md={6} lg={5}>
                                <Button
                                    type="primary"
                                    block
                                    onClick={() => handleCash(tableId as string)}
                                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                                >
                                    Thanh toán bằng tiền mặt
                                </Button>
                            </Col>
                            <Col xs={24} sm={8} md={6} lg={5}>
                                <Button
                                    type="primary"
                                    block
                                    onClick={() => handleVNPay(tableId as string)}
                                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                                >
                                    Thanh toán bằng VNPay
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderDetailPage;
