import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Row, Col, notification, Upload, Avatar, Image, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { CustomerDto } from "../../models/customerDto";
import { UpdateAccountCus } from "../../services/auth-services";

const AccountPage = () => {
    const [userDetails, setUserDetails] = useState<CustomerDto | null>(null);
    const [fileInputRefs, setfileInputRef] = useState<HTMLInputElement | null>(null); // useRef for file input
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [userImage, setUserImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('https://restaurantmanagement.azurewebsites.net/api/account/account-cus-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'
                    }
                });

                if (response.data?.value) {
                    setUserDetails(response.data.value);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo();
    }, []);

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



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomerDto) => {
        if (userDetails) {
            setUserDetails({
                ...userDetails,
                [field]: e.target.value,
            });
        }
    };


    const handleSubmit = async (values: any) => {
        try {
            if (userDetails) {
                const formData = new FormData();
                formData.append('lastName', values.lastName);
                formData.append('firstName', values.firstName);
                formData.append('phoneNumber', values.phoneNumber);
                formData.append('gender', values.gender);

                // If there's an updated image, append it as well
                if (fileInputRefs && fileInputRefs.files) {
                    formData.append('image', fileInputRefs.files[0]);
                }
                console.log(userDetails.userImage);
                console.log(formData);
                const updateCus = await UpdateAccountCus(formData, userDetails.userId);
                if (updateCus) {
                    notification.success({
                        message: 'Cập nhật thành công',
                        description: 'Trang cá nhân của bạn đã được cập nhật thành công',
                    });
                    setUserDetails(updateCus);
                    window.location.reload();
                } else {
                    notification.error({
                        message: 'Cập nhật thất bại',
                        description: 'Cập nhật trang cá nhân thất bại. Vui lòng thử lại',
                    });
                }
            }
        } catch (error) {
            console.error('Error during submission:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error during profile update. Please try again.',
            });
        }
    };

    if (!userDetails) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="account-page" style={{ width: '100%', maxWidth: '1200px' }}>

                <div className="row">
                    <div className="col-12" key={userDetails?.userId}>
                        <div className="row">
                            <Form
                                layout="vertical"
                                initialValues={userDetails}
                                onFinish={handleSubmit}
                            >
                                <div className="row">
                                    <div className="col-md-3 border-right">
                                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                            <Image
                                                width={150}  // Reduced size for smaller screens
                                                src={
                                                    userImage || userDetails?.userImage ||
                                                    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                                }
                                                alt="Customer"
                                                style={{ borderRadius: "50%" }}
                                            />
                                            <Button
                                                type="primary"
                                                icon={<UploadOutlined />}
                                                onClick={() => fileInputRefs?.click()}
                                            >
                                                Upload Image
                                            </Button>
                                            {/* Hidden file input */}
                                            <input
                                                ref={(input) => setfileInputRef(input)}  // Hoặc sử dụng useRef thay vì useState
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-7">
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="First Name"
                                                    name="firstName"
                                                    rules={[{ required: true, message: 'Please enter your first name!' }]}>
                                                    <Input
                                                        placeholder="Enter first name"
                                                        onChange={(e) => handleChange(e, 'firstName')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Last Name"
                                                    name="lastName"
                                                    rules={[{ required: true, message: 'Please enter your last name!' }]}>
                                                    <Input
                                                        placeholder="Enter last name"
                                                        onChange={(e) => handleChange(e, 'lastName')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[{ required: true, message: 'Please enter your email!' }]}>
                                                    <Input
                                                        placeholder="Enter email"
                                                        onChange={(e) => handleChange(e, 'email')} readOnly
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Phone Number"
                                                    name="phoneNumber"
                                                    rules={[{ required: true, message: 'Please enter your phone number!' }]}>
                                                    <Input
                                                        placeholder="Enter phone number"
                                                        type="number"
                                                        onChange={(e) => handleChange(e, 'phoneNumber')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Gender"
                                                    name="gender"
                                                    rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                                                >
                                                    <Select
                                                        placeholder="Chọn giới tính"
                                                        onChange={(value) => handleChange(value, 'gender')}
                                                    >
                                                        <Select.Option value="Male">Nam</Select.Option>
                                                        <Select.Option value="Female">Nữ</Select.Option>
                                                        <Select.Option value="Other">Khác</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={35}>
                                            <div className="row mt-5">
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit" className="profile-button" block>
                                                            Save Profile
                                                        </Button>
                                                    </Form.Item>
                                                </Col>
                                            </div>

                                            <div className="row mt-5">
                                                <Col span={24}>
                                                    <Button type="primary">
                                                        <Link to="/account/changePassword" style={{ textDecoration: 'none' }}>Change Password</Link>
                                                    </Button>
                                                </Col>
                                            </div>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    </div>
                </div>

            </div >
        </div >
    );
};

export default AccountPage;
