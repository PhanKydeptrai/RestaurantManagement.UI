import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DeleteOrder, GetOrderDetail, UpdateOrder } from "../../services/order-services";
import { toast, ToastContainer } from "react-toastify";
import { Button, Input, Table, Space, Typography, Form, Row, Col, Breadcrumb } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const OrderDetailPage = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const [table, setTable] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOrderDetail(tableId as string);
                console.log(result);
                setTable(result);
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

    const handleUpdate = async (tableId: string) => {
        try {
            console.log("Updating order: ", tableId);
            const response = await UpdateOrder(tableId);
            if (response?.isSuccess) {
                notifySucess();
            } else {
                notifyError();
            }
        } catch (error) {
            notifyError();
            console.error("Error updating order:", error);
        }
    };

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
            dataIndex: "image",
            key: "image",
            render: (image: string) => <img src={image} alt="meal" width={100} height={100} />
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
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="middle">
                    {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleUpdate(record.tableId)}
                    >
                        Update
                    </Button> */}
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
                        dataSource={table?.value.orderDetails}
                        rowKey="orderDetailId"
                        pagination={false}
                        bordered
                    />
                </div>
                <ToastContainer />
            </main>
        </>
    );
};

export default OrderDetailPage;
