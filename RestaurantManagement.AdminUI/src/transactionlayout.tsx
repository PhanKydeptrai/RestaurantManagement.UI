import React from 'react';
import { Outlet } from 'react-router-dom';

const TransactionLayout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default TransactionLayout;