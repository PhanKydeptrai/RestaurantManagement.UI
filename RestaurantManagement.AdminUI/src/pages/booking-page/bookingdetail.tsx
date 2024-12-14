import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBookingById } from "../../services/book-services";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;
const DetailBookingPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<any>();
    useEffect(() => {
        const fecthData = async () => {
            try {
                const result = await GetBookingById(bookId as string);
                console.log(result);
                setBook(result);
            } catch (e) {
                console.log(e);
            }
        }; fecthData();
    }, [bookId]);

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/bookings">Book</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container" key={bookId}>
                    <h2>Chi tiết Booking</h2>
                    <form>
                        <div className="mb-3">
                            <Form.Item label='Mã Booking'>
                                <Input
                                    type="text"
                                    value={book?.value.bookId}
                                    readOnly
                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label='Mã Người Dùng'>
                                <Input
                                    type="text"
                                    value={book?.value.userId}
                                    readOnly
                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label='Họ và tên'>
                                <Input
                                    type="text"
                                    value={book?.value.lastName + ' ' + book?.value.firstName}
                                    readOnly
                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label='Email'>
                                <Input
                                    type="email"
                                    value={book?.value.email}
                                    readOnly
                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label='Số Điện Thoại'>
                                <Input
                                    type="text"
                                    value={book?.value.phone}
                                    readOnly
                                />
                            </Form.Item>

                        </div>
                        <div className="mb-3">
                            <Form.Item label="Ngày Đặt">
                                <Input type="text" value={book?.value.bookingDate} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Giờ Đặt">
                                <Input type="time" value={book?.value.bookingTime} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Giá Booking">
                                <Input type="number" value={book?.value.bookingPrice} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Trạng Thái Thanh Toán">
                                <Input type="text" value={book?.value.paymentStatus} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Trạng Thái Booking">
                                <Input type="text" value={book?.value.bookingStatus} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Số bàn">
                                <Input type="text" value={book?.value.tableId} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Số Khách">
                                <Input type="number" value={book?.value.numberOfCustomers} readOnly />
                            </Form.Item>
                        </div>
                        <div className="mb-3">
                            <Form.Item label="Ghi Chú">
                                <TextArea value={book?.value.note} readOnly />
                            </Form.Item>

                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
export default DetailBookingPage;