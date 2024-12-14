
import React from 'react';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const VerifyAccountCompletePage = () => (
    <Result
        icon={<SmileOutlined />}
        title="Tài khoản đã được kích hoạt thành công!"

    />
);

export default VerifyAccountCompletePage;