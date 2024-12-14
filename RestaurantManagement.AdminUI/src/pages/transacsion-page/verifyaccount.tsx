
import React from 'react';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const VerifyAccountPage = () => (
    <Result
        icon={<SmileOutlined />}
        title="Xác thực tài khoản thành công!"

    />
);

export default VerifyAccountPage;