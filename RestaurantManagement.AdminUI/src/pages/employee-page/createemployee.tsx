import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CreateEmployee } from "../../services/employee-service";
import { Form, Input, Select, Button, Row, Col, Image, Breadcrumb, notification } from "antd";

const { Option } = Select;

const CreateEmployeePage = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userImage, setUserImage] = useState<string | null>(null);
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!lastName) newErrors.lastName = "Vui lòng nhập họ";
        if (!firstName) newErrors.firstName = "Vui lòng nhập tên";
        if (!email) newErrors.email = "Vui lòng nhập email";
        if (!phoneNumber) newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
        if (!role) newErrors.role = "Vui lòng chọn vai trò";
        if (!gender) newErrors.gender = "Vui lòng chọn giới tính";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const notifySuccess = () => {
        toast.success('Thành công!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };

    const notifyError = () => {
        toast.error('Vui lòng kiểm tra lại!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('gender', gender);
        formData.append('role', role);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('userImage', fileInputRef.current.files[0]);
        }

        const response = await CreateEmployee(formData);
        if (response && response.isSuccess) {
            notification.success({
                message: 'Tạo mới nhân viên thành công',
                description: 'Nhân viên đã được tạo thành công! Đang chuyển hướng về trang danh sách nhân viên...',
            });
            setTimeout(() => {
                navigate('/employees');
            }, 2000);
        } else {
            notification.error({
                message: 'Tạo mới nhân viên thất bại',
                description: 'Vui lòng kiểm tra lại thông tin!',
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/dashboard"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/employees">Employees</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Create</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Left Column: Profile image */}
                    <Col xs={24} sm={8} md={6}>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <Image
                                width={150}
                                src={userImage || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'}
                                alt="Employee"
                                style={{ borderRadius: "50%" }}
                            />
                            <Button className="mt-3" onClick={handleFileSelect}>Chọn ảnh</Button>
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                        </div>
                    </Col>

                    {/* Right Column: Employee Information */}
                    <Col xs={24} sm={16} md={18}>
                        <div className="p-3 py-5">
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="First Name">
                                        <Input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Nhập tên"
                                        />
                                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Last Name">
                                        <Input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Nhập họ"
                                        />
                                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="Email">
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nhập email"
                                        />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item label="Phone Number">
                                        <Input
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Nhập số điện thoại"
                                        />
                                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Gender">
                                        <Select
                                            value={gender}
                                            onChange={(value) => setGender(value)}
                                            placeholder="Chọn giới tính"
                                        >
                                            <Option value="">Chọn giới tính</Option>
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                            <Option value="Orther">Orther</Option>
                                        </Select>
                                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Role">
                                        <Select
                                            value={role}
                                            onChange={(value) => setRole(value)}
                                            placeholder="Chọn vai trò"
                                        >
                                            <Option value="">Chọn vai trò</Option>
                                            <Option value="Manager">Manager</Option>
                                            <Option value="Receptionist">Receptionist</Option>
                                            <Option value="Waiter">Waiter</Option>
                                            <Option value="Cashier">Cashier</Option>
                                        </Select>
                                        {errors.role && <div className="text-danger">{errors.role}</div>}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16} justify="center">
                                <Col>
                                    <Button type="primary" htmlType="submit">Lưu</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </form>
            <ToastContainer />
        </>
    );
};

export default CreateEmployeePage;
