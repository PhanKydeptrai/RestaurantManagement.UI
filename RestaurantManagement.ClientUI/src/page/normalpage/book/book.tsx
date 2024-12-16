import { useEffect, useState } from "react";
import { Form, Input, message, Modal, notification, Row, Select } from "antd";
import { BookingSubcribe, CreateBooking, GetAllBooking, GetBookingById } from "../../../services/book-services";
import { BookDto } from "../../../models/bookingDto";
import dayjs from 'dayjs';
import { Descriptions } from 'antd';
import { Link } from "react-router-dom";
import { InfoOutlined } from '@ant-design/icons';

const { Option } = Select;
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

    // Page search
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Fetch booking list for pagination
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

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };
    const validationForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName) {
            newErrors.firstName = 'Vui lòng nhập tên';
        }
        if (!lastName) {
            newErrors.lastName = 'Vui lòng nhập họ';
        }
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại không được bỏ trống';
        }
        if (Number(phoneNumber) < 0) {
            newErrors.phoneNumber = 'Số điện thoại không không phải là số âm';
        }
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
        }
        if (!email) {
            newErrors.email = 'Email không được bỏ trống';
        }
        if (!bookingDate) {
            newErrors.bookingDate = 'Vui lòng chọn ngày đặt bàn';
        }
        if (!bookingTime) {
            newErrors.bookingTime = 'Vui lòng chọn giờ đặt bàn';
        }
        if (!numberOfCustomer) {
            newErrors.numberOfCustomer = 'Vui lòng chọn số lượng khách';
        }
        if (Number(numberOfCustomer) < 0) {
            newErrors.numberOfCustomer = 'Số lượng khách không thể là số âm';
        }
        if (!/^\d+$/.test(numberOfCustomer.toString())) {
            newErrors.numberOfCustomer = 'Số lượng khách phải là số';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSearchId = async (id: string) => {
        if (id.trim() === '') {
            setBookingDetails(null);
            return;
        }

        setLoading(true);
        try {
            const results = await GetBookingById(id);
            console.log('Booking details:', results);

            if (results) {
                setBookingDetails(results);
            } else {
                setBookingDetails(null);
                notification.error({
                    message: 'Mã booking không tồn tại',
                    description: 'Vui lòng kiểm tra lại mã booking và thử lại',
                });
            }
        } catch (error) {
            console.error("Error fetching booking by id:", error);
            setBookingDetails(null);
            notification.error({
                message: 'Lỗi khi tìm kiếm booking',
                description: 'Vui lòng thử lại sau',
            });
        } finally {
            setLoading(false);
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchId(e.currentTarget.value);
        }
    };


    // Handle booking form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit');
        Modal.confirm({
            title: 'Xác nhận đặt bàn',
            okText: 'Đồng ý',
            okType: 'primary',
            cancelText: 'Huỷ',
            content: (
                <>
                    <p> Bạn có chắc chắn muốn đặt bàn không? Bạn đã đọc và đồng ý với điều khoản của nhà hàng không?</p>
                </>
            ),
            onOk: async () => {
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
                        const res = await CreateBooking(data);
                        console.log("this is response: ", res);
                        if (res && res.isSuccess) {
                            notification.success({
                                message: 'Đặt bàn thành công',
                                description: 'Vui lòng kiểm tra email để xác nhận đơn đặt bàn',
                            });
                        } else {
                            notification.error({
                                message: 'Đặt bàn thát bại',
                                description: 'Vui lòng thử lại sau',
                            });
                        }

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
                        const res = await BookingSubcribe(dataSub);
                        console.log("this is response: ", res);
                        if (res && res.isSuccess) {
                            notification.success({
                                message: 'Đặt bàn thành công',
                                description: 'Kiểm tra lại email để xác nhận đơn đặt bàn',
                            });
                        } else {
                            notification.error({
                                message: 'Đặt bàn thất bại',
                                description: 'Vui lòng thử lại sau',
                            });
                        }
                    } catch (error) {
                        console.log("this is error: ", error);
                    }
                }
            }
        });
    };



    // Handle time change (when the user selects time)
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookingTime(e.target.value);
    };


    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <label htmlFor="">Tìm kiếm theo ID bàn</label>
                    <Input
                        placeholder="Nhập mã đặt bàn"
                        onKeyDown={handleKeyPress}// Trigger on each input change
                    />
                </div>
            </div>

            {/* Display booking details if found */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                bookingDetails && (
                    <div className="booking-details mt-4 justify-content-center center col-12 col-offset-6
">
                        <h3>Thông tin đặt bàn của bạn</h3>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Mã đặt bàn">
                                {bookingDetails.bookId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tên">
                                {bookingDetails.firstName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Họ">
                                {bookingDetails.lastName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {bookingDetails.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">
                                {bookingDetails.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt bàn">
                                {dayjs(bookingDetails.bookingDate).format('YYYY-MM-DD')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giờ đặt bàn">
                                {bookingDetails.bookingTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số lượng người">
                                {bookingDetails.numberOfCustomers}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú">
                                {bookingDetails.note}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )
            )}
            <div className="container mt-5">
                <div className="row">
                    <h3 className="text-center w-100">Điều khoản dịch vụ</h3>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">Phí đặt bàn</h5>
                                <p className="card-text">
                                    Đặt bàn sẽ tính phí, thành toán 50% phí đặt bàn khi đặt bàn trên website. Phí đặt bàn sẽ không hoàn lại nếu quý khách hủy đặt bàn.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">Đổi bàn</h5>
                                <p className="card-text">
                                    Nhà hàng chỉ hỗ trợ khách đổi bàn sang loại bàn có nhiều người hơn. Không hỗ trợ đổi bàn sang loại bàn ít người hơn. Và nếu có bất kì lỗi hay vấn đề gì từ bàn của nhà hàng, nhà hàng sẽ hỗ trợ đổi bàn cho khách hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">Số khách</h5>
                                <p className="card-text">
                                    Đặt bàn trực tuyến chỉ áp dụng cho đơn đặt bàn dưới 20 người. Để đặt bàn trên 20 người, vui lòng liên hệ hotline (+84) 984009581.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">Thời gian chờ</h5>
                                <p className="card-text">
                                    Bàn quý khách đặt sẽ có thời gian chờ là 2 tiếng, tính từ thời gian hẹn.
                                    Quý khách vui lòng liên hệ hotline (+84) 984009581 khi có bất kỳ thay đổi gì về thời gian hẹn.
                                </p>
                                <i>
                                    <p><strong>Lưu ý:</strong> Bàn sẽ tự động huỷ sau 2 tiếng nếu quý khách không đến, tính từ thời gian hẹn.</p>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Row className="my-3 justify-content-center text-center">
                <div className="position-relative d-inline-block">
                    <h2 className="my-4">
                        Đặt bàn
                    </h2>
                </div>
            </Row>

            {
                !isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Tên' name='firstName' rules={[{ required: true, message: 'Please input your first name!' }]}>
                                    <Input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Item>
                                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Họ' name='lastName' rules={[{ required: true, message: 'Please input your last name!' }]} >
                                    <Input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Item>
                                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]} >
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Số điện thoại' name='phoneNumber' rules={[{ required: true, message: 'Please input your phone number!' }]} >
                                    <Input
                                        type="number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </Form.Item>
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Ngày' name='bookingDate' rules={[{ required: true, message: 'Please input your booking date!' }]} >
                                    <Input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                    />
                                </Form.Item>

                                {errors.bookingDate && <p className="text-danger">{errors.bookingDate}</p>}
                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Giờ' name='bookingTime' rules={[{ required: true, message: 'Please input your booking time!' }]} >
                                    <Input
                                        type="time"
                                        value={bookingTime}
                                        onChange={handleTimeChange}
                                    />
                                </Form.Item>
                                {errors.bookingTime && <p className="text-danger">{errors.bookingTime}</p>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Số người' name='numberOfCustomer' rules={[{ required: true, message: 'Please input number of people!' }]} >
                                    <Input
                                        type="number"
                                        value={numberOfCustomer}
                                        onChange={(e) => setNumberOfCustomer(parseInt(e.target.value))}
                                    />
                                </Form.Item>
                                {errors.numberOfCustomer && <p className="text-danger">{errors.numberOfCustomer}</p>}
                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Ghi chú' name='note' >
                                    <Input.TextArea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </Form.Item>

                            </div>
                        </div>

                        <div className="text-center my-4">
                            <button type="submit" className="btn btn-success">
                                Đặt bàn ngay
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Ngày' name='bookingDate' rules={[{ required: true, message: 'Please input your booking date!' }]} >
                                    <Input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                    />
                                    {errors.bookingDate && <p className="text-danger">{errors.bookingDate}</p>}
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Giờ' name='bookingTime' rules={[{ required: true, message: 'Please input your booking time!' }]} >
                                    <Input
                                        type="time"
                                        value={bookingTime}
                                        onChange={handleTimeChange}
                                    />
                                    {errors.bookingTime && <p className="text-danger">{errors.bookingTime}</p>}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <Form.Item label='Số lượng người' name='numberOfCustomer' rules={[{ required: true, message: 'Please input number of people!' }]} >
                                    <Input
                                        type="number"
                                        value={numberOfCustomer}
                                        onChange={(e) => setNumberOfCustomer(parseInt(e.target.value))}
                                    />
                                    {errors.numberOfCustomer && <p className="text-danger">{errors.numberOfCustomer}</p>}
                                </Form.Item>

                            </div>
                            <div className="col-md-6">
                                <Form.Item label='Ghi chú' name='note' >
                                    <Input.TextArea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </Form.Item>

                            </div>
                        </div>

                        <div className="text-center my-4">
                            <button type="submit" className="btn btn-success">
                                Đặt bàn ngay
                            </button>
                        </div>
                    </form>
                )
            }

        </div >
    );
};

export default BookFormOfNormal;
