import { useState } from "react";
import { CustomerResetPassword } from "../../services/auth-services";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await CustomerResetPassword(email);
            setMessage('Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.');
        } catch (error) {
            setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <main>
                <h2>Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit">Gửi yêu cầu</button>
                </form>
                {message && <p>{message}</p>}
            </main>
        </>
    );
};

export default ResetPasswordPage;