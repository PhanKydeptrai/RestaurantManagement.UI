import { DatePicker, Form, FormProps, Input, InputNumber, message, TimePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { CreateBooking, GetAllBooking } from "../../../services/book-services";
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
    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="">Tìm kiếm bàn của bạn</label>
                        <Input
                            placeholder="Nhập mã đặt bàn của bạn"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                        />
                    </div>
                </div>
            </div>
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
                    <form action="">
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