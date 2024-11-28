import { useState } from "react";
import { CustomerRegister } from "../../services/auth-services";
import { toast, ToastContainer } from "react-toastify";
import { validate } from "uuid";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ lastName?: string, fisrtName?: string, email?: string, phone?: string, passWord?: string, gender?: string }>();

    const notifySucess = () => {
        toast.success('Thành công! Mã xác nhận đã được gửi về email đã đăng kí', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const notifyError = () => {
        toast.error('Vui lòng kiểm tra lại!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    const validateForm = () => {
        const newErrors: { firstName?: string, lastName?: string, email?: string, passWord?: string, phone?: string, gender?: string } = {}
        if (!firstName) {
            newErrors.firstName = "Vui lòng nhập tên";
        }
        if (!lastName) {
            newErrors.lastName = "Vui lòng nhập họ";
        }
        if (!email) {
            newErrors.email = "Vui lòng nhập email";
        }
        if (!password) {
            newErrors.passWord = "Vui lòng nhập mật khẩu";
        }
        if (!phone) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        }
        if (!gender) {
            newErrors.gender = "Vui lòng chọn giới tính";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await CustomerRegister(firstName, lastName, email, password, phone, gender);
            if (response) {
                notifySucess();
                navigate('/login');
            }
            else {
                notifyError();
            }
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Form Column */}
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit} className="w-75">
                            <h2 className="mb-4">Register Customer</h2>
                            <div className="mb-3">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"

                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}

                                />
                                {errors?.fisrtName && <p className="text-danger">{errors.fisrtName}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className="form-control"

                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}

                                />
                                {errors?.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"

                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                {errors?.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"

                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                {errors?.passWord && <p className="text-danger">{errors.passWord}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone:</label>
                                <input
                                    type="text"
                                    className="form-control"

                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}

                                />
                                {errors?.phone && <p className="text-danger">{errors.phone}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giới tính:</label>
                                <select
                                    className="form-select"

                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}

                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                    <option value="Orther">Khác</option>
                                </select>
                                {errors?.gender && <div className="text-danger">{errors.gender}</div>}

                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>

                    {/* Image Column */}
                    <div className="col-md-6 d-none d-md-block">
                        {/* <img src="https://skillking.fpt.edu.vn/wp-content/uploads/2020/11/FSK_poster-448x900-01.jpg" alt="Descriptive Alt Text" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} /> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
export default RegisterPage;