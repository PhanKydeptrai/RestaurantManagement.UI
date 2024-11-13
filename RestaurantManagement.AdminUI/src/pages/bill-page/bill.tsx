import { useEffect, useState } from "react";
import { BillDto } from "../../models/billDto";
import { GetAllBill } from "../../services/bill-services";
import { Pagination, Space, Table } from "antd";
import { Link, useParams } from "react-router-dom";

const BillPage = () => {
    const [bills, setBills] = useState<BillDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetAllBill('', '', '', '', pageIndex, pageSize);
                setBills(result.value.items);
                setTotalCount(result.totalCount);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };
        fetchData();
    }, [pageIndex, pageSize]);

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
                    {/* Chuyển hướng đến trang chi tiết hóa đơn, truyền `billId` */}
                    <Link to={`/bill/detailbill/${record.billId}`}>View Order Details</Link>
                </Space>
            ),
        }
    ];

    return (
        <>
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Bill</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={bills}
                pagination={false}
                rowKey="billId"
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={(page: number) => setPageIndex(page)}
                showSizeChanger={false}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                style={{ marginTop: 20 }}
            />
        </>
    );
};

export default BillPage;
