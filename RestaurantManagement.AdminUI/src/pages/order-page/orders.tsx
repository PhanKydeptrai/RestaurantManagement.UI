import { Link } from "react-router-dom";
import { OrderDto } from "../../models/orderDto";
import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/order-services";
import { Table, Button, Input, Pagination, Space, notification } from "antd";

const OrderPage = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [totalCount, setTotalCount] = useState(0);

    const [filterUserId, setFilterUserId] = useState("");
    const [filterTableId, setFilterTableId] = useState("");
    const [filterPaymentStatus, setFilterPaymentStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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
                if (error instanceof Error) {
                    notification.error({ message: "Failed to load orders", description: error.message });
                } else {
                    notification.error({ message: "Failed to load orders", description: "An unknown error occurred" });
                }
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

    //#region Table Columns
    const columns = [
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
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Action",
            key: "action",
            render: (text: string, record: OrderDto) => (
                <Space size="middle">
                    <Link to={`/orders/${record.tableId}`}>
                        <Button type="primary">View</Button>
                    </Link>
                    {/* <Link to={`/orders/update/${record.tableId}`}>
                        <Button>Update</Button>
                    </Link> */}
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
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/"><dt>Dashboard</dt></Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Orders</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                {/* Create Order Button */}
                <div className="col-md-2 mb-3">
                    <Link to="/order/create">
                        <Button type="primary" block>Create Order</Button>
                    </Link>
                </div>

                {/* Search Section */}
                <div className="row mt-3">
                    <div className="col-md-6">
                        <Input
                            placeholder="Search by Order ID or User ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Button
                            onClick={() => setSearchTerm('')}
                            style={{ marginTop: 8 }}
                        >
                            Clear Search
                        </Button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="row mt-3">
                    <div className="col-12">
                        <Table
                            columns={columns}
                            dataSource={orders}
                            pagination={false}
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
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            </div>
        </main>
    );
};

export default OrderPage;
