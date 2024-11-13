import React, { useState } from 'react';
import { Form, Input, Button, notification, Row, Col, Breadcrumb } from 'antd';
import { EmployeeChangePassword } from '../../services/account-services';
import { Link } from 'react-router-dom';

const ChangePasswordPage = () => {
    const [loading, setLoading] = useState(false); // To handle loading state during password change
    const [form] = Form.useForm();


    // Handle form submission
    const handleSubmit = async (values: any) => {
        setLoading(true); // Set loading to true when submitting the form
        const { oldPassword, newPassword } = values;

        try {
            const response = await EmployeeChangePassword(oldPassword, newPassword); // Call API function
            if (response && response.isSuccess) {
                notification.success({
                    message: 'Password Changed Successfully',
                    description: 'Plesae check your email for verifying your new password.',
                });
                form.resetFields(); // Reset form after success
            } else {
                notification.error({
                    message: 'Password Change Failed',
                    description: response.errors[0].message || 'There was an error while changing your password.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'There was an error while changing your password. Please try again later.',
            });
        } finally {
            setLoading(false); // Set loading to false after the operation finishes
        }
    };

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/account">Account</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Change Password</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <div className="change-password-page" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>Change Password</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                    }}
                >
                    <Form.Item
                        label="Old Password"
                        name="oldPassword"
                        rules={[{ required: true, message: 'Please enter your old password!' }]}
                    >
                        <Input.Password placeholder="Enter your old password" />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Please enter your new password!' },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long.',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your new password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your new password" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ width: '100%' }}
                        >
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ChangePasswordPage;
