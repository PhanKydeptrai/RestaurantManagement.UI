import { Link } from "react-router-dom";
import { OrderDto } from "../../models/orderDto";
import React, { useEffect, useState } from "react";
import { GetAllOrders, GetOrderSearchTable, GetPaymentStatus } from "../../services/order-services";
import { Table, Button, Input, Pagination, Space, notification, Row, Col, Breadcrumb, Tag, Select, TableColumnsType } from "antd";
import { render } from "react-dom";
import { EyeOutlined, FormOutlined, LeftOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
const OrderPage = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const [filterUserId, setFilterUserId] = useState("");
    const [filterTableId, setFilterTableId] = useState("");
    const [filterPaymentStatus, setFilterPaymentStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await GetAllOrders(
                    filterUserId,
                    filterTableId,
                    filterPaymentStatus,
                    searchTerm,
                    "orderId", // Default sorting by orderId
                    "asc", // Default ascending order
                    pageIndex,
                    pageSize
                );
                setOrders(results.items);
                setTotalCount(results.totalCount);
            } catch (error) {
                return error;
            }
        };
        fetchData();
    }, [
        pageIndex,
        pageSize,
        filterUserId,
        filterTableId,
        filterPaymentStatus,
        searchTerm,
    ]);

    const handleFilterPaymentStatusChange = async (value: string) => {
        setFilterPaymentStatus(value);
        const results = await GetPaymentStatus(value, pageSize, pageIndex);
        setOrders(results.items);
        setTotalCount(results.totalCount);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTableId(e.target.value);
    };
    const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const results = await GetOrderSearchTable(pageSize, pageIndex, filterTableId);
            setOrders(results.items);
            setTotalCount(results.totalCount);
        }
    };
    //#region Table Columns
    const columns: TableColumnsType<OrderDto> = [
        {
            title: "No.",
            key: "rowNumber",
            render: (text: string, record: OrderDto, index: number) => {
                const rowNumber = sortOrder === "asc"
                    ? (pageIndex - 1) * pageSize + (index + 1)
                    : totalCount - (pageIndex - 1) * pageSize - index;
                return rowNumber;
            },
        },
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Table ID",
            dataIndex: "tableId",
            key: "tableId",
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status: string) => (
                <Tag color={status === 'Paid' ? 'green' :
                    status === 'Unpaid' ? 'red' : ''
                }> {status}
                </Tag>
            ),
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            render: (text: string, record: OrderDto) => (
                <Space size="middle">
                    {record.paymentStatus !== 'Paid' && (
                        <>
                            <Link to={`/orders/${record.tableId}`}>
                                <Button icon={<EyeOutlined />} type="primary">View</Button>
                            </Link>
                            <Link to={`/change-table/${record.tableId}`}>
                                <Button icon={<RetweetOutlined />} type="primary">Change Table</Button>
                            </Link></>
                    )}
                </Space>
            ),
        },
    ];
    //#endregion

    //#region Pagination
    const handlePageChange = (page: number) => {
        setPageIndex(page);
    };
    //#endregion

    return (
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
                {/* Create Order Button */}
                <div className="row">
                    <div className="col-md-2 mb-3">
                        <Link to="/order/create">
                            <Button type="primary" icon={<FormOutlined />} block>Create Order</Button>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Select value={filterPaymentStatus} onChange={handleFilterPaymentStatusChange} style={{ width: '100%' }}>
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="Paid">Paid</Select.Option>
                            <Select.Option value="Unpaid">Unpaid</Select.Option>
                        </Select>
                    </div>
                    {/* Search Section */}
                    <div className="col-md-2">
                        <Input
                            placeholder="Search by Table ID"
                            value={filterTableId}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="row mt-3">
                    <div className="col-12">
                        <Table
                            bordered
                            columns={columns}
                            dataSource={orders}
                            pagination={false}
                            scroll={{ x: 'max-content' }}
                            rowKey="orderId"
                        />
                    </div>
                </div>

                {/* Pagination */}
                <div className="row mt-5">
                    <Pagination
                        current={pageIndex}
                        total={totalCount}
                        pageSize={pageSize}
                        onChange={(page) => setPageIndex(page)} // Cập nhật pageIndex khi người dùng thay đổi trang
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        disabled={loading} // Vô hiệu hóa phân trang khi đang tải dữ liệu
                        prevIcon={
                            hasPreviousPage ? (
                                <LeftOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang trước
                            ) : (
                                <LeftOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang trước
                            )
                        }
                        nextIcon={
                            hasNextPage ? (
                                <RightOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang tiếp theo
                            ) : (
                                <RightOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang tiếp theo
                            )
                        }
                    />
                </div>
            </div>
        </main>
    );
};

export default OrderPage;
