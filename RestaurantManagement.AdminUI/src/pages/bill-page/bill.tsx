import { useEffect, useState } from "react";
import { BillDto } from "../../models/billDto";
import { GetAllBill } from "../../services/bill-services";
import { Pagination, Space, Table } from "antd";
import { Link } from "react-router-dom";

const BillPage = () => {
    // State variables
    const [bills, setBills] = useState<BillDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [totalCount, setTotalCount] = useState<number>(0);
    const [filterUserId, setFilterUserId] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortColumn, setSortColumn] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");

    // Fetch data on state change
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const result = await GetAllBill(filterUserId, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
                console.log(result);
                // Assuming result is in the correct format, update states accordingly
                setBills(result.value.items);  // Make sure this is correct structure
                setTotalCount(result.totalCount);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };

        fetchData();
    }, [filterUserId, searchTerm, sortColumn, sortOrder, pageIndex, pageSize]);

    // Table columns definition
    const columns = [
        { title: 'Bill ID', dataIndex: 'billId', key: 'billId' },
        { title: 'Table ID', dataIndex: 'tableId', key: 'tableId' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Payment Type', dataIndex: 'paymentType', key: 'paymentType' },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        {
            title: 'Order Details',
            key: 'orderDetails',
            render: (text: string, record: BillDto) => (
                <Space>
                    <Link to={`/orderdetail/${record.orderId}`}>View Order Details</Link>
                </Space>
            )
        }
    ];

    return (
        <>
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/"><dt>Dashboard</dt></Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Bill</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={bills}
                pagination={false} // Disable default pagination, use custom pagination
                rowKey="billId" // Use `billId` as the row key for uniqueness
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={(page: number) => setPageIndex(page)} // Set page index
                showSizeChanger={false} // Disable size changer, since we have a fixed page size
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} // Show total items info
                style={{ marginTop: 20 }}
            />
        </>
    );
};

export default BillPage;
