import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBookingById } from "../../services/book-services";

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
                            <label className="form-label">Mã Booking</label>
                            <input type="text" className="form-control" value={book?.value.bookId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mã Người Dùng</label>
                            <input type="text" className="form-control" value={book?.value.userId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên</label>
                            <input type="text" className="form-control" value={book?.value.firstName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Họ</label>
                            <input type="text" className="form-control" value={book?.value.lastName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={book?.value.email} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số Điện Thoại</label>
                            <input type="text" className="form-control" value={book?.value.phone} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày Đặt</label>
                            <input type="date" className="form-control" value={book?.value.bookingDate} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giờ Đặt</label>
                            <input type="time" className="form-control" value={book?.value.bookingTime} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giá Booking</label>
                            <input type="number" className="form-control" value={book?.value.bookingPrice} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Trạng Thái Thanh Toán</label>
                            <input type="text" className="form-control" value={book?.value.paymentStatus} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Trạng Thái Booking</label>
                            <input type="text" className="form-control" value={book?.value.bookingStatus} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số Khách</label>
                            <input type="number" className="form-control" value={book?.value.numberOfCustomers} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ghi Chú</label>
                            <textarea className="form-control" value={book?.value.note} readOnly></textarea>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
export default DetailBookingPage;