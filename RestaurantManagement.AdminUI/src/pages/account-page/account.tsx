import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { EmployeeDto } from "../../models/employeeDto";
import { Form, Input, Button, Row, Col, notification, Upload, Avatar, Image } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UpdateAccountEmp } from "../../services/account-services";

const AccountPage = () => {
    const [userDetails, setUserDetails] = useState<EmployeeDto | null>(null);
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

                const response = await axios.get('https://restaurantmanagement.azurewebsites.net/api/account/account-emp-info', {
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EmployeeDto) => {
        if (userDetails) {
            setUserDetails({
                ...userDetails,
                [field]: e.target.value,
            });
        }
    };



    // Handle form submission
    const handleSubmit = async (values: any) => {
        try {
            if (userDetails) {
                const formData = new FormData();

                // Append the form data fields
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('phoneNumber', values.phoneNumber);


                // If there's an updated image, append it as well
                if (fileInputRefs && fileInputRefs.files) {
                    formData.append('userImage', fileInputRefs.files[0]);
                }
                console.log(formData);
                // Call the update API
                const updatedUser = await UpdateAccountEmp(formData, userDetails.userId);

                if (updatedUser) {
                    notification.success({
                        message: 'Cập nhật thành công',
                        description: 'Thông tin của bạn đã được cập nhật thành công.',
                    });
                    setUserDetails(updatedUser);  // Update state with the updated user details
                    window.location.reload();
                } else {
                    notification.error({
                        message: 'Cập nhật thất bại',
                        description: 'Có lỗi xảy ra trong quá trình cập nhật thông tin. Vui lòng thử lại.',
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


    // If user details are not loaded
    if (!userDetails) {
        return <h1>Loading...</h1>;
    }

    return (
        <>

            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard"><dt>Dashboard</dt></Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">Account</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-12" key={userDetails?.userId}>
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <Image
                                    width={150}  // Reduced size for smaller screens
                                    src={
                                        userImage || userDetails?.userImage ||
                                        "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    }
                                    alt="Employee"
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
                                    ref={setfileInputRef}
                                    type="file"
                                    style={{ display: 'none' }}  // Hide the input
                                    onChange={handleFileChange}
                                />


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
                                        <Col span={12}>
                                            <Form.Item
                                                label="First Name"
                                                name="firstName"
                                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                                            >
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
                                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                                            >
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
                                                rules={[{ required: true, message: 'Please enter your email!' }]}
                                            >
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
                                                rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                            >
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
                                                rules={[{ required: true, message: 'Please enter your gender!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter gender"
                                                    onChange={(e) => handleChange(e, 'gender')} readOnly
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Role"
                                                name="role"
                                                rules={[{ required: true, message: 'Please enter your role!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter role"
                                                    onChange={(e) => handleChange(e, 'role')} readOnly
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
                                                    <Link to="/account/changePassword" style={{ textDecoration: 'none' }}>Change Password</Link>
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

        </>
    );
};

export default AccountPage;
