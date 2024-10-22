
export const Rule = () => {
    return (
        <>
            <h1>Điều khoản dịch vụ</h1>
            <p>Đặt bàn sẽ tính phí</p>
            <ul>
                <li>Thanh toán 50% phí đặt bàn khi đặt trên web<br />
                    (Phí đặt bàn phụ thuộc vào loại bàn và số lượng bàn)</li>
                <li>Nhà hàng chỉ hỗ trợ khách đổi loại sang loại có nhiều người hơn<br />
                    (VD: Bàn 4 người ⇒ bàn 6 người) Nhà hàng sẽ trừ 50% phí booking quý khách đã thanh toán cho phí book của bàn mới.</li>
                <li>Ưu đãi: đặt ≥ 5 bàn giảm 20% tổng phí book.<br />
                    Phí book = Giá bàn X số lượng - (Giá bàn X số lượng X 20%)</li>
                <li>Bàn quý khách đặt sẽ có thời gian chờ là 2 tiếng tính từ thời gian hẹn. Quý khách vui lòng liên hệ hotline khi có bất kì thay đổi gì về thời gian hẹn.
                    <br />Lưu ý: Nếu quý khách không liên hệ trong thời gian chờ thì bàn sẽ tự động hủy khi quý khách đến sau 2 tiếng tính từ thời gian hẹn.
                    <br />(Khách hàng cần xác nhận thông tin qua email được gửi đến)</li>
            </ul>
            <table className="table">
                <thead>
                    <tr>
                        <th>Loại bàn</th>
                        <th>Phí cơ bản</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bàn 4 người</td>
                        <td>50.000 VNĐ</td>
                    </tr>
                    <tr>
                        <td>Bàn 6 người</td>
                        <td>100.000 VNĐ</td>
                    </tr>
                    <tr>
                        <td>Bàn 10 người</td>
                        <td>200.000 VNĐ</td>
                    </tr>
                    <tr>
                        <td>Bàn 20 người</td>
                        <td>500.000 VNĐ</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}