import { useEffect, useState } from "react";
import { GetAllBooking } from "../../services/book-services";
import { Link } from "react-router-dom";
import { BookDto } from "../../models/bookDto";

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
            const results = await GetAllBooking(filterBookingStatus, filterPaymentStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            if (Array.isArray(results)) {
                setBookings(results);
                console.log(bookings);
            } else {
                console.error("Dữ liệu không đúng định dạng:", results);
                setBookings([]); // Đặt bookings thành mảng rỗng nếu dữ liệu không đúng
            }
        };

        fetchData();
    }, [pageIndex, pageSize]);


    // Pagination
    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPageIndex(pageIndex + 1);
        }
    };

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Book</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Booking Time</th>
                                <th>Number of Customer</th>
                                <th>Table Id</th>
                                <th>Booking Price</th>
                                <th>Booking Status</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? bookings.map((booking) => (
                                <tr>
                                    <td>{booking.email}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.bookingTime}</td>
                                    <td>{booking.numberOfCustomer}</td>
                                    <td>{booking.tableId}</td>
                                    <td>{booking.bookingPrice}</td>
                                    <td className={
                                        booking.bookingStatus === 'Waiting' ? 'text-warning' : booking.bookingStatus === 'Canceled' ? 'text-danger' : booking.bookingStatus === 'Assign' ? 'text-primary' : booking.bookingStatus === 'Completed' ? 'text-success' : booking.bookingStatus === 'Seated' ? 'text-info' : ''
                                    }>
                                        {booking.bookingStatus}
                                    </td>
                                    <td className={
                                        booking.paymentStatus === 'Waiting' ? 'text-warning' : booking.paymentStatus === 'Paid' ? 'text-success' : booking.paymentStatus === 'Expired' ? 'text-danger' : ''
                                    }
                                    >{booking.paymentStatus}</td>
                                    <td>
                                        <Link to={`/arrangebooking/${booking.bookId}`} className="btn btn-success">Assign</Link>
                                        <Link to={`bookingdetail/${booking.bookId}`} className="btn btn-info">Detail</Link>

                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={12} className="text-center">No bookings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="row mt-5">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={`page-item ${!hasPreviousPage && 'disabled'}`}>
                                    <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link">Page {pageIndex}</span>
                                </li>
                                <li className={`page-item ${!hasNextPage && 'disabled'}`}>
                                    <button className="page-link" onClick={handleNextPage}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BookingPage;
