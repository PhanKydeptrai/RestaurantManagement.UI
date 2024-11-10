import { useEffect, useState } from "react";
import { GetAllBooking } from "../../services/book-services";
import { Link } from "react-router-dom";
import { BookDto } from "../../models/bookDto";
import { Table, Button, Pagination, Space, notification, Tag } from "antd";

const BookingPage = () => {
    const [bookings, setBookings] = useState<BookDto[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

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

    // Columns configuration for the table
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
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
                            status === 'Completed' ? 'green' :
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
            render: (_: any, record: BookDto) => (
                <Space size="middle">
                    <Link to={`/arrangebooking/${record.bookId}`}>
                        <Button type="primary">Assign</Button>
                    </Link>
                    <Link to={`/bookingdetail/${record.bookId}`}>
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

            <div className="container">
                <Table
                    columns={columns}
                    dataSource={bookings}
                    pagination={false}  // Disable internal pagination
                    rowKey="bookId"
                    scroll={{ x: 'max-content' }}
                />
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

export default BookingPage;
