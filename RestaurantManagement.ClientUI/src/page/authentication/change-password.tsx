import React, { useState } from 'react';
import { Form, Input, Button, notification, Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { CustomerChangePassword } from '../../services/auth-services';

const ChangePasswordPage = () => {
    const [loading, setLoading] = useState(false); // To handle loading state during password change
    const [form] = Form.useForm();


    // Handle form submission
    const handleSubmit = async (values: any) => {
        setLoading(true); // Set loading to true when submitting the form
        const { oldPassword, newPassword } = values;

        try {
            const response = await CustomerChangePassword(oldPassword, newPassword); // Call API function
            if (response && response.isSuccess) {
                notification.success({
                    message: 'Thay đổi mật khẩu thành công',
                    description: 'Vui lòng kiểm tra email để cập nhật những thông tin cần thiết',
                });
                form.resetFields(); // Reset form after success
            } else {
                notification.error({
                    message: 'Đổi mật khẩu thất bại',
                    description: response.errors[0].message || 'Đã có lỗi trong quá trình thay đổi mật khẩu',
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
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu cũ" />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                            {
                                min: 8,
                                message: 'Mật khẩu phải chứa ít nhất 8 ký tự',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Mật khẩu không khớp xin vui lòng kiểm tra lại');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu mới" />
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
