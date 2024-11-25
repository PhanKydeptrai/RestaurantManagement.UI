import { useEffect, useState } from "react";
import { BillDto } from "../../models/billDto";
import { ExportBill, GetAllBill } from "../../services/bill-services";
import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { Link, useParams } from "react-router-dom";
import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const BillPage = () => {
    const [bills, setBills] = useState<BillDto[]>([]);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterUserId, setFilterUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllBill(filterUserId, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setBills(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize]);
    const handleExportBill = async (billId: string) => {
        try {
            const result = await ExportBill(billId); // Gọi API ExportBill
            console.log(result);
            console.log(billId);
            console.log("Exported bill successfully");
        } catch (error) {
            console.error("Error exporting bill:", error);
        }
    };

    const columns: TableColumnsType<BillDto> = [
        { title: 'Bill ID', dataIndex: 'billId', key: 'billId' },
        { title: 'Table ID', dataIndex: 'tableId', key: 'tableId' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Payment Type', dataIndex: 'paymentType', key: 'paymentType' },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        {
            title: 'Action',
            key: 'actions',
            fixed: 'right',
            render: (text: string, record: BillDto) => (
                <Space>
                    <Button type="primary" icon={<DeleteOutlined />}>
                        <Link style={{ textDecoration: 'none' }} to={`/bill/detailbill/${record.billId}`}>View</Link>
                    </Button>
                    <Button type="primary" onClick={() => handleExportBill(record.billId)}>
                        Export
                    </Button>
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
            <Table<BillDto>
                bordered
                columns={columns}
                dataSource={bills}
                scroll={{ x: 'max-content' }}
                pagination={false}
                rowKey="billId"
            />

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
        </>
    );
};

export default BillPage;
