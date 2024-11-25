import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteOrder, GetOrderDetail, OrderPayCash, UpdateOrder } from "../../services/order-services";
import { toast, ToastContainer } from "react-toastify";
import { Button, Input, Table, Space, Typography, Form, Row, Col, Breadcrumb } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { OrderDetailDto } from "../../models/orderDto";

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

    //#region Message
    const notifySucess = () => {
        toast.success('Thành công!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    };

    const notifyError = () => {
        toast.error('Vui lòng kiểm tra lại!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    };
    //#endregion

    const handleQuantityChange = (orderDetailId: string, change: number) => {
        setDataSource(prevDataSource => {
            // Tìm dòng có orderDetailId cần thay đổi
            const updatedDataSource = prevDataSource.map(item => {
                if (item.orderDetailId === orderDetailId) {
                    // Chỉ cập nhật quantity của dòng này
                    const updatedItem = { ...item, quantity: item.quantity + change };
                    // Sau khi cập nhật quantity, gọi hàm handleUpdate để gửi cập nhật
                    handleUpdate(orderDetailId, updatedItem.quantity);
                    return updatedItem;
                }
                return item;
            });

            // Trả về updated dataSource với chỉ dòng đã thay đổi
            return updatedDataSource;
        });
    };

    const handleUpdate = async (orderDetailId: string, quantity: number) => {
        try {
            console.log("Updating order: ", orderDetailId, " with new quantity: ", quantity);

            // Giả sử bạn cần gửi cập nhật quantity cùng với orderDetailId đến backend
            const response = await UpdateOrder(orderDetailId, quantity)
            if (response && response.isSuccess) {
                const result = await GetOrderDetail(tableId as string);
                console.log(result);
                setTable(result);
                setDataSource(result?.value?.orderDetails || []); // Set dữ liệu ban đầu
                notifySucess();
            } else {
                notifyError();
            }


        } catch (error) {
            notifyError();
            console.error("Error updating order:", error);
        }
    };



    // Hàm xóa order
    const handleDelete = async (OrderId: string) => {
        try {
            console.log("Deleting order: ", OrderId);
            const response = await DeleteOrder(OrderId);
            if (response.isSuccess) {
                notifySucess();
            } else {
                notifyError();
            }
        } catch (error) {
            notifyError();
            console.error("Error deleting order:", error);
        }
    };


    // cash => paymentStatus = "Paid"
    const handleCash = async (tableId: string) => {
        try {
            console.log("Updating order: ", tableId);
            const response = await OrderPayCash(tableId);
            if (response?.isSuccess) {
                notifySucess();
                setTimeout(() => {
                    navigate('/bills');
                }, 2000);
            } else {
                notifyError();
            }
        } catch (error) {
            notifyError();
            console.error("Error updating order:", error);
        }
    }
    // Cấu hình cột cho bảng
    const columns = [
        {
            title: "Order Detail Id",
            dataIndex: "orderDetailId",
            key: "orderDetailId",
        },
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
            render: (quantity: number, record: OrderDetailDto) => (
                <div>
                    <Button
                        onClick={() => handleQuantityChange(record.orderDetailId, -1)}
                        disabled={quantity <= 1} // Disable decrease if quantity is 1
                    >
                        -
                    </Button>
                    <span style={{ margin: '0 8px' }}>{quantity}</span>
                    <Button
                        onClick={() => handleQuantityChange(record.orderDetailId, 1)}
                    >
                        +
                    </Button>
                </div>
            ),
        },

        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary" danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.orderDetailId)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
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
                        <Form.Item label="Total">
                            <Input value={table?.value.total} readOnly />
                        </Form.Item>
                    </Form>

                    {/* Order Details Table */}
                    <Title level={2}>Order Detail</Title>

                    <Table
                        columns={columns}
                        dataSource={dataSource}  // Sử dụng dataSource
                        rowKey="orderDetailId"
                        pagination={false}
                        bordered
                    />
                    <Button type="primary" onClick={() => handleCash(table?.value.tableId)}>Cash</Button>

                </div>
                <ToastContainer />
            </main>
        </>
    );
};

export default OrderDetailPage;
