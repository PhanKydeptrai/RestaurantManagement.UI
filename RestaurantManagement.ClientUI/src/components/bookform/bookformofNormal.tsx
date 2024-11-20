import { DatePicker, Form, FormProps, Input, InputNumber, message, TimePicker } from "antd";
import { useState } from "react";
import { CreateBooking } from "../../services/book-services";
import dayjs, { Dayjs } from 'dayjs';


const BookFormOfNormal = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [numberOfCustomer, setNumberOfCustomer] = useState(0);
    const [note, setNote] = useState('');

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
            <h2 className="text-center my-4">Book For Table</h2>
            <div className="container">
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
                <div className="mt-5"></div>
            </div>
        </>

    );
}

export default BookFormOfNormal;