import React, { useState } from 'react';
import { CustomerLogin, handleFacebookLogin, handleGoogleLogin } from '../../services/auth-services';
import { Link, useNavigate } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { notification } from 'antd';
const LoginPage = () => {

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
            const token = await CustomerLogin(email, password);
            console.log('Token:', token);
            if (token && (token.isSuccess === true || token.response === '200')) {
                navigate('/');
                notification.success({ message: 'Đăng nhập thành công', description: 'Chào mừng bạn đã đến với hệ thống của chúng tôi' });
            } else {
                notification.error({ message: 'Đăng nhập thất bại', description: 'Email hoặc mật khẩu không đúng.' });
            }
        } catch (error) {
            console.error('Login failed:', error);
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
    //Google Login
    const handleClickGoogleLogin = async (credentialResponse: any) => {
        const result = await handleGoogleLogin(credentialResponse);
        if (result.isSuccess) {
            notification.success({ message: 'Đăng nhập thành công', description: 'Chào mừng bạn đã đến với hệ thống của chúng tôi' });
            navigate('/');

        }
        else {
            //dùng tạm alert
            notification.error({ message: 'Đăng nhập thất bại', description: 'Vui lòng kiểm tra lại thông tin đăng nhập' });
        }
    };

    //Facebook Login 
    const handleClickFacebookLogin = async (credentialResponse: any) => {
        const result = await handleFacebookLogin(credentialResponse);
        if (result.isSuccess) {
            navigate('/');
            //dùng tạm alert
            notification.success({ message: 'Đăng nhập thành công', description: 'Chào mừng bạn đã đến với hệ thống của chúng tôi' });
        }
        else {
            //dùng tạm alert
            notification.error({ message: 'Đăng nhập thất bại', description: 'Vui lòng kiểm tra lại thông tin đăng nhập' });
        }
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
                                            Nhập email hoặc số điện thoại
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            // value="email" Tầm bậy
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nhập email hoặc số điện thoại"
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
                                            // value="password" Tầm bậy
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            autoComplete="current-password"
                                        />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>
                                    <Link to="/forgotpassword" className="card-link text-secondary">Quên mật khẩu</Link>
                                    {/* <a href="#" className="card-link text-success">
                                        Quên mật khẩu?
                                    </a> */}
                                    <Link to="/register" className="card-link float-end text-primary">
                                        Bạn chưa có tài khoản? Đăng ký tại đây</Link>

                                    <div className="text-center pt-3">
                                        <button type="submit" className="btn btn-success" >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                                {/* GOOGLE LOGIN */}
                                <div className="border-top m-3"></div>
                                <div className="text-center mt-2">
                                    <div className="d-flex justify-content-center">
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                handleClickGoogleLogin(credentialResponse);
                                                console.log(credentialResponse);
                                            }}
                                            onError={() => {
                                                alert('Login Failed!');
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <div className="d-flex justify-content-center">
                                        <FacebookLogin
                                            appId="972871797990372"
                                            onSuccess={(response) => {
                                                console.log('Login Success!', response);
                                                // alert('Login Success!');
                                            }}
                                            onFail={(error) => {
                                                console.log('Login Failed!', error);
                                                alert('Login Success!');
                                            }}
                                            onProfileSuccess={(response) => {
                                                handleClickFacebookLogin(response);
                                                console.log('Get Profile Success!', response.email);
                                            }}
                                            style={{
                                                backgroundColor: '#4267b2',
                                                color: '#fff',
                                                fontSize: '16.5px',
                                                padding: '9px 26px',
                                                border: 'none',
                                                borderRadius: '4px',
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>

    )
}
export default LoginPage;