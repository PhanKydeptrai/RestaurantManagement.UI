import { Link } from "react-router-dom"

export const Book = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="container-fluid">
                    <h2>Đặt bàn</h2>
                    <div className="row">
                        <div className="col-md-8">
                            <form id="customerForm">
                                <div className="form-group">
                                    <label >Họ:</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" required />
                                </div>
                                <div className="form-group">
                                    <label >Tên:</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" required />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại:</label>
                                    <input type="tel" className="form-control" id="phone" name="phone" required />
                                </div>
                                <div className="form-group">
                                    <label >Email:</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <form id="tableForm">
                                <label >Chọn ngày:</label>
                                <input type="date" className="form-control m-1" id="tableDate" />
                                <label >Chọn loại bàn:</label>
                                <select className="form-control m-1" id="tableType">
                                    <option value="4">Bàn 4 người</option>
                                    <option value="6">Bàn 6 người</option>
                                    <option value="10">Bàn 10 người</option>
                                    <option value="20">Bàn 20 người</option>
                                </select>
                                <label>Mã giảm giá:</label>
                                <input type="text" className="form-control" id="voucher" name="voucher" />

                                <label >Ghi chú</label>
                                <textarea className="form-control" id="tableQuantity" placeholder="Ghi Chú" />
                                <p id="tablePrice"></p>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="terms" />
                                    <label className="form-check-label" htmlFor="terms" ><Link to="/rule">Điều khoản dịch vụ</Link></label>
                                </div>
                                <button type="button" className="btn btn-success">Đặt bàn</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}