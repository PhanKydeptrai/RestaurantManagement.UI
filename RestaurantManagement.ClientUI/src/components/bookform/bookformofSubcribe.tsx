import { useState } from "react";
import { BookingSubcribe } from "../../services/book-services";

const BookFormOfSubcribe = () => {

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        const token = sessionStorage.getItem('token');
        console.log(token);

        const data = {
            bookingDate: bookingDate,
            bookingTime: `${bookingTime}:00`,
            numberOfCustomer: numberOfCustomer,
            note: note
        }
        console.log("Data be sent: ", data);
        try {
            const res = BookingSubcribe(data);
            console.log("this is res: ", res);
        } catch (error) {
            console.log("this is error: ", error);
        }
    }
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
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
                            onChange={(e) => setBookingTime(e.target.value)}

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
                    <div className="text-center my-4">
                        <button
                            type="submit"
                            onClick={saveTime}
                            className="btn btn-success"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BookFormOfSubcribe;