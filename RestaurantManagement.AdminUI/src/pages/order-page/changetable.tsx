import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetOrderDetail } from "../../services/table-services";
import { Breadcrumb, Col, Form, Input, notification, Row, Button, Typography } from "antd";
import { ArrowDownOutlined } from '@ant-design/icons';
import { ChangeTable } from "../../services/order-services";

const { Title } = Typography;

const ChangeTablePage = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const [table, setTable] = useState<any>();
    const [newTableId, setNewTableId] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const navigate = useNavigate();

    // Fetch the table details when the page loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOrderDetail(tableId as string);
                console.log(result);
                setTable(result);
            } catch (e) {
                console.log(e);
                notification.error({
                    message: "Error fetching table details",
                    description: "There was an issue fetching the details for this table."
                });
            }
        };
        fetchData();
    }, [tableId]);

    // Update the table with the new table id and note
    const handleUpdateTable = async (values: { newTableId: any; note: any }) => {


        if (!newTableId) {
            notification.error({
                message: "Vui lòng chọn bàn mới",
                description: "Chọn bàn mới để chuyển đổi"
            });
            return;
        }

        try {
            console.log("Changing table", tableId, "to", newTableId, "with note", note);
            const data = {
                newTableId: newTableId,
                note: note
            };
            const response = await ChangeTable(tableId as string, data);  // Passing the data object
            if (response && response.isSuccess) {
                console.log("Table change successful");
                navigate("/orders");
                notification.success({
                    message: "Đổi bàn thành công",
                    description: `Đã thành công dời bàn ${tableId} sang ${newTableId}`
                });
            } else {
                notification.error({
                    message: "Đổi bàn thất bại",
                    description: `Đổi bàn thất bại ${tableId} sang ${newTableId}`
                });
            }
        } catch (e) {
            console.log(e);
            notification.error({
                message: "Error",
                description: "An error occurred while changing the table."
            });
        }
    };

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/orders">Order</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Change Table
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <div className="container">
                <Form onFinish={handleUpdateTable}>
                    <Form.Item label="Table Id">
                        <Input value={table?.value.tableId} readOnly />
                    </Form.Item>

                    <ArrowDownOutlined style={{ fontSize: '24px', margin: '0 16px' }} />

                    <Form.Item
                        label="New Table Id"
                        name="newTableId"
                        rules={[{ required: true, message: 'Please enter a new table Id!' }]}
                    >
                        <Input
                            type="number"
                            value={newTableId}
                            onChange={(e) => setNewTableId(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Title level={5}>Note</Title>
                        <Input.TextArea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change Table
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ChangeTablePage;
