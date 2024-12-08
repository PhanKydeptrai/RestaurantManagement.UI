import { DatePicker, Form, FormProps, Input, InputNumber, message, TimePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { BookingSubcribe, CreateBooking, GetAllBooking, GetBookingById } from "../../../services/book-services";
import { BookDto } from "../../../models/bookingDto";


const BookFormOfNormal = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [numberOfCustomer, setNumberOfCustomer] = useState(0);
    const [note, setNote] = useState('');
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // page search
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
        const fecthData = async () => {
            const results = await GetAllBooking(filterBookingStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setBookings(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
        };
        fecthData();
    }, [filterBookingStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex]);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const results = await GetAllBooking(filterBookingStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setBookings(results.items);
            setTotalCount(results.totalCount);
        }
    };
    const handleSearchId = async (id: string) => {
        if (!id) {
            setBookingDetails(null);  // Nếu không có mã tìm kiếm, xóa chi tiết trước đó.
            return;
        }

        const results = await GetBookingById(id); // Gọi API tìm kiếm thông tin theo ID
        console.log('this is result: ', results);

        if (results.data.value) { // Kiểm tra nếu có dữ liệu trả về
            setBookingDetails(results.data); // Lưu kết quả vào state để hiển thị
        } else {
            setBookingDetails(null); // Nếu không có dữ liệu, set state là null
            message.error('No booking found with this ID'); // Hiển thị thông báo lỗi
        }
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleTimeChange = (e: any) => {
        setBookingTime(e.target.value);
    };

    const saveTime = () => {
        const fullTime = `${bookingTime}:00`; // thêm giây là 00
        console.log('Thời gian đã lưu:', fullTime);
        // Có thể lưu giá trị này vào nơi bạn cần, ví dụ: gửi lên server hoặc lưu vào state khác
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit');

        const token = sessionStorage.getItem('token');
        if (!token) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                bookingDate: bookingDate,
                bookingTime: `${bookingTime}:00`,
                numberOfCustomers: numberOfCustomer,
                note: note
            }
            console.log("Data be sent: ", data);
            try {
                const res = CreateBooking(data);
                console.log("this is response: ", res);
                message.success('Booking successfully');

            } catch (error) {
                console.log("this is error: ", error);
            }
        } else {
            const dataSub = {
                bookingDate: bookingDate,
                bookingTime: `${bookingTime}:00`,
                numberOfCustomers: numberOfCustomer,
                note: note
            }
            console.log("Data be sent: ", dataSub);
            try {
                const res = BookingSubcribe(dataSub);
                console.log("this is response: ", res);
                message.success('Booking successfully');
            } catch (error) {
                console.log("this is error: ", error);
            }
        }
    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="">Tìm kiếm bàn của bạn</label>
                        <Input
                            placeholder="Nhập mã đặt bàn của bạn"
                            onChange={(e) => handleSearchId(e.target.value)} // Gọi hàm tìm kiếm khi thay đổi giá trị
                        />
                    </div>
                </div>
            </div>

            {bookingDetails ? (
                <div className="container mt-4">
                    <h4>Booking Details:</h4>
                    <div><strong>First Name:</strong> {bookingDetails.firstName.data.value}</div>
                    <div><strong>Last Name:</strong> {bookingDetails.lastName}</div>
                    <div><strong>Email:</strong> {bookingDetails.email}</div>
                    <div><strong>Phone Number:</strong> {bookingDetails.phoneNumber}</div>
                    <div><strong>Booking Date:</strong> {bookingDetails.bookingDate}</div>
                    <div><strong>Booking Time:</strong> {bookingDetails.bookingTime}</div>
                    <div><strong>Number of People:</strong> {bookingDetails.numberOfCustomers}</div>
                    <div><strong>Note:</strong> {bookingDetails.note}</div>
                </div>
            ) : (
                <div className="container mt-4">
                    {/* Hiển thị thông báo nếu không có kết quả */}
                    {!searchTerm ? (
                        <p>Nhập mã đặt bàn để tìm kiếm thông tin.</p>
                    ) : (
                        <p>Không tìm thấy thông tin đặt bàn với mã này.</p>
                    )}
                </div>
            )}
            <div className="container">
                <h2 className="text-center my-4">Book For Table</h2>

                {!isLoggedIn ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Day</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}

                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={bookingTime}
                                        onChange={handleTimeChange}

                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Number Of People</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={numberOfCustomer}
                                        onChange={(e) => setNumberOfCustomer(parseInt(e.target.value))}

                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Note</label>
                                    <textarea
                                        className="form-control"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}

                                    />
                                </div>
                            </div>

                            <div className="text-center my-4">
                                <button
                                    type="submit"
                                    onClick={saveTime}
                                    className="btn btn-success"
                                >
                                    Book Now
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Day</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}

                                />
                            </div>
                            <div className="col-md-6">
                                <label>Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={bookingTime}
                                    onChange={handleTimeChange}

                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Number Of People</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={numberOfCustomer}
                                    onChange={(e) => setNumberOfCustomer(parseInt(e.target.value))}

                                />
                            </div>
                            <div className="col-md-6">
                                <label>Note</label>
                                <textarea
                                    className="form-control"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}

                                />
                            </div>
                        </div>

                        <div className="text-center my-4">
                            <button
                                type="submit"
                                onClick={saveTime}
                                className="btn btn-success"
                            >
                                Book Now
                            </button>
                        </div>
                    </form>
                )}
                <div className="mt-5"></div>
            </div>
        </>

    );
}

export default BookFormOfNormal;