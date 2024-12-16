import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBillDetail } from "../../services/bill-services";
import { Breadcrumb, Col, Row, Form, Input, Table } from "antd";
import { OrderDetailDto } from "../../models/orderDto";  // Đảm bảo có import DTO cho Order Detail

const BillDetailPage = () => {
    const { billId } = useParams<{ billId: string }>();
    const [bill, setBill] = useState<any>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetailDto[]>([]);  // Dữ liệu chi tiết đơn hàng

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetBillDetail(billId as string); // Lấy dữ liệu hóa đơn từ API
                setBill(result);
                setOrderDetails(result?.value?.orderDetails || []); // Lấy order details nếu có
            } catch (e) {
                console.error("Error fetching bill detail:", e);
            }
        };
        fetchData();
    }, [billId]);

    // Cấu hình các cột cho bảng OrderDetails
    const columns = [
        {
            title: "Meal Name",  // Tên món ăn
            dataIndex: "mealName",
            key: "mealName",
        },
        {
            title: "Quantity",  // Số lượng
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",  // Đơn giá
            dataIndex: "unitPrice",
            key: "unitPrice",
            render: (unitPrice: number) => `${unitPrice.toLocaleString()} VND`,  // Định dạng tiền tệ
        },
        {
            title: "Total",  // Tổng tiền của mỗi món ăn
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (_: any, record: any) => `${(record.quantity * record.unitPrice).toLocaleString()} VND`, // Tính tổng tiền
        }
    ];

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/dashboard">Dashboard</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/bills">Bill</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <div className="container">
                <Form layout="vertical">
                    <Form.Item label="Bill Id">
                        <Input value={bill?.value.billId} readOnly />
                    </Form.Item>
                    <Form.Item label="Table Id">
                        <Input value={bill?.value.tableId} readOnly />
                    </Form.Item>
                    <Form.Item label="Total Price">
                        <Input value={`${bill?.value.totalPrice} VND`} readOnly />
                    </Form.Item>
                    <Form.Item label="Payment Type">
                        <Input value={bill?.value.paymentType} readOnly />
                    </Form.Item>
                    {/* Các form item khác để hiển thị thông tin khách hàng */}
                </Form>

                <Table
                    columns={columns}
                    dataSource={orderDetails}
                    rowKey="orderDetailId"
                    pagination={false}
                    bordered
                />
            </div>
        </>
    );
};

export default BillDetailPage;
