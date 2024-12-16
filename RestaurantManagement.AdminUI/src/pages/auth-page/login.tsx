import React, { useState } from 'react';
import { EmployeeLogin } from '../../services/loginservice';
import { Link, useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const token = await EmployeeLogin(email, password);

            console.log('Token:', token); // Kiểm tra cấu trúc của token trong console

            // Kiểm tra token theo cấu trúc thực tế của API trả về
            if (token && (token.isSuccess === true || token.response === '200')) {
                // Đăng nhập thành công, chuyển hướng đến trang Dashboard
                navigate('/dashboard');

                notification.success({
                    message: 'Đăng nhập thành công',
                    description: `Chúc mừng bạn đã đăng nhập thành công với tài khoản: ${email}`,
                });
            } else {
                // Nếu không thành công, thông báo lỗi
                notification.error({
                    message: 'Đăng nhập thất bại',
                    description: 'Email hoặc mật khẩu không đúng.',
                });
            }
        } catch (error) {
            // Nếu có lỗi trong quá trình gọi API
            console.error('Login failed:', error);
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.',
            });
        }
    };


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!email) {
            newErrors.email = 'Vui lòng nhập email hoặc số điện thoại';
        }
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Nhập email
                                        </label>
                                        <input

                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nhập email"
                                        />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            autoComplete="current-password"
                                        />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>
                                    <Link to="/forgotpassword" className="card-link text-secondary">Quên mật khẩu</Link>
                                    <div className="text-center pt-3">
                                        <button type="submit" className="btn btn-success">
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default Login;
