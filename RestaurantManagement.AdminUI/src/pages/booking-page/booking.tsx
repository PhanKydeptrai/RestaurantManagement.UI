import { useEffect, useState } from "react";
import { FilterBookingStatus, FilterPaymentStatus, GetAllBooking } from "../../services/book-services";
import { Link } from "react-router-dom";
import { BookDto } from "../../models/bookDto";
import { Table, Button, Pagination, Space, notification, Tag, Select } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";  // Import ColumnsType for TypeScript

const { Option } = Select;

const BookingPage = () => {
    const [bookings, setBookings] = useState<BookDto[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [filterBookingStatus, setFilterBookingStatus] = useState('');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await GetAllBooking(
                    filterBookingStatus, filterPaymentStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize
                );
                if (Array.isArray(results)) {
                    setBookings(results);
                    setHasNextPage(results.length === pageSize);
                    setHasPreviousPage(pageIndex > 1);
                    setTotalCount(results.length); // Update with the correct total count
                } else {
                    console.error("Dữ liệu không đúng định dạng:", results);
                    setBookings([]);
                }
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "Unable to load bookings.",
                });
            }
        };

        fetchData();
    }, [pageIndex, pageSize, filterBookingStatus, filterPaymentStatus, searchTerm, sortColumn, sortOrder]);

    // Handle page changes
    const handlePageChange = (page: number) => {
        setPageIndex(page);
    };

    const handleFilterBookingStatusChange = async (value: string) => {
        setFilterBookingStatus(value);
        const results = await FilterBookingStatus(value, pageIndex, pageSize);
        setBookings(results.items);
        setTotalCount(results.totalCount);
    };

    const handleFilterPaymentStatusChange = async (value: string) => {
        setFilterPaymentStatus(value);
        const results = await FilterPaymentStatus(value, pageIndex, pageSize);
        setBookings(results.items);
        setTotalCount(results.totalCount);
    }

    // Columns configuration for the table using ColumnsType
    const columns: ColumnsType<BookDto> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => email,  // Display email
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone: string) => phone,  // Display phone number
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
        },
        {
            title: 'Booking Time',
            dataIndex: 'bookingTime',
            key: 'bookingTime',
        },
        {
            title: 'Number of Customers',
            dataIndex: 'numberOfCustomer',
            key: 'numberOfCustomer',
        },
        {
            title: 'Table ID',
            dataIndex: 'tableId',
            key: 'tableId',
        },
        {
            title: 'Booking Price',
            dataIndex: 'bookingPrice',
            key: 'bookingPrice',
        },
        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            key: 'bookingStatus',
            render: (status: string) => (
                <Tag color={status === 'Waiting' ? 'orange' :
                    status === 'Canceled' ? 'red' :
                        status === 'Assign' ? 'blue' :
                            status === 'Occupied' ? 'green' :
                                status === 'Seated' ? 'cyan' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <Tag color={status === 'Waiting' ? 'orange' :
                    status === 'Paid' ? 'green' :
                        status === 'Expired' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_: any, record: BookDto) => (
                <Space size="middle">
                    {record.bookingStatus === 'Waiting' ? (
                        <Link to={`/arrangebooking/${record.bookId}`}>
                            <Button type="primary">Assign</Button>
                        </Link>
                    ) : (
                        <Button disabled>Assign</Button>
                    )}
                    <Link to={`bookingdetail/${record.bookId}`}>
                        <Button>Detail</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <main>
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/"><dt>Dashboard</dt></Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Booking</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Link to={""}></Link>
                </div>
                <div className="col-md-2">
                    <Select value={filterBookingStatus} onChange={handleFilterBookingStatusChange} style={{ width: '100%' }}>
                        <Option value="">All Book Status</Option>
                        <Option value="Waiting">Waiting</Option>
                        <Option value="Seated">Seated</Option>
                        <Option value="Occupied">Occupied</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select value={filterPaymentStatus} onChange={handleFilterPaymentStatusChange} style={{ width: "100%" }}>
                        <Option value="">All Payment Status</Option>
                        <Option value="Waiting">Waiting</Option>
                        <Option value="Paid">Paid</Option>
                    </Select>
                </div>
            </div>

            <div className="container">
                <Table<BookDto>
                    bordered
                    columns={columns}
                    dataSource={bookings}
                    pagination={false}  // Disable internal pagination
                    rowKey="bookId"
                    scroll={{ x: 'max-content' }}
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
            </div>
        </main>
    );
};

export default BookingPage;
