import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-bootstrap/lib/Navbar';

const TransactionErrorPage = () => (
    <Result
        status="warning"
        title="Thanh toán thất bại"
        subTitle="Thanh toán thất bại, vui lòng thử lại sau."
    />
);

export default TransactionErrorPage;