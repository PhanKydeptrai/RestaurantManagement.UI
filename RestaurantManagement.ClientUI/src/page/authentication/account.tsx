import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Row, Col, notification, Upload, Avatar, Image } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { CustomerDto } from "../../models/customerDto";

const AccountPage = () => {
    const [userDetails, setUserDetails] = useState<CustomerDto | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // useRef for file input
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomerDto) => {
        if (userDetails) {
            setUserDetails({
                ...userDetails,
                [field]: e.target.value,
            });
        }
    };

    const handleImageChange = (file: any) => {
        if (file) {
            console.log('Image file selected:', file);
            setUserDetails({
                ...userDetails!,
                userImage: URL.createObjectURL(file) // Just for demo
            });
        }
        return false; // Prevents auto-upload behavior
    };

    const handleSubmit = async (values: any) => {
        try {
            if (userDetails) {
                const formData = new FormData();
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('phoneNumber', values.phoneNumber);

                if (userDetails.userImage && userDetails.userImage !== values.userImage) {
                    const imageFile = fileInputRef.current?.files?.[0];
                    if (imageFile) {
                        formData.append('userImage', imageFile);
                    }
                }
                console.log(formData);
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
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <Image
                                        width={150}  // Reduced size for smaller screens
                                        src={
                                            userDetails?.userImage ||
                                            "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                        }
                                        alt="Employee"
                                        style={{ borderRadius: "50%" }}
                                    />
                                    <Upload
                                        ref={fileInputRef}
                                        accept="image/*"
                                        showUploadList={false}
                                        beforeUpload={handleImageChange}
                                    >
                                        <Button
                                            type="primary"
                                            icon={<UploadOutlined />}
                                            style={{ marginTop: '10px' }}
                                        >
                                            Change Image
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <Form
                                        layout="vertical"
                                        initialValues={userDetails}
                                        onFinish={handleSubmit}
                                    >
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="First Name"
                                                    name="firstName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
                                                >
                                                    <Input
                                                        placeholder="Nhập tên"
                                                        onChange={(e) => handleChange(e, 'firstName')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Last Name"
                                                    name="lastName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập họ của bạn' }]}
                                                >
                                                    <Input
                                                        placeholder="Nhập họ"
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
                                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                                >
                                                    <Input
                                                        placeholder="Nhập email"
                                                        onChange={(e) => handleChange(e, 'email')} readOnly
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Phone Number"
                                                    name="phoneNumber"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                                >
                                                    <Input
                                                        placeholder="Nhập số điện thoại"
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
                                                    rules={[{ required: true, message: 'Vui lòng nhập giới tính' }]}
                                                >
                                                    <Input
                                                        placeholder="Chọn giới tính"
                                                        onChange={(e) => handleChange(e, 'gender')}
                                                    />
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
                                                        <Link to="/changePassword" style={{ textDecoration: 'none' }}>Change Password</Link>
                                                    </Button>
                                                </Col>
                                            </div>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountPage;
