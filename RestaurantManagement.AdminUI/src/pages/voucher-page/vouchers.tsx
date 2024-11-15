import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VoucherDto } from "../../models/voucherDto";
import { DeleteVoucher, GetAllVouchers } from "../../services/voucher-services";
import { Button, Input, Table, Pagination, notification, Tag, Space } from "antd";

const VoucherPage = () => {
    const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllVouchers(pageSize, pageIndex, searchTerm);
            setVouchers(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm]);

    //#region Search
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetAllVouchers(8, 1, searchTerm);
            setPageIndex(1);
            setVouchers(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
    }
    //#endregion

    const handleDelete = async (id: string) => {
        try {
            await DeleteVoucher(id);
            const results = await GetAllVouchers(8, pageIndex, searchTerm);
            setVouchers(results.items);

            notification.success({ message: "Voucher Deleted", description: "Voucher has been successfully deleted." });
        } catch (error) {
            notification.error({ message: "Error", description: "Failed to delete the voucher." });
        }
    };

    const columns = [
        {
            title: 'Voucher Name',
            dataIndex: 'voucherName',
            key: 'voucherName',
        },
        {
            title: 'Max Discount',
            dataIndex: 'maxDiscount',
            key: 'maxDiscount',
        },
        {
            title: 'Voucher Condition',
            dataIndex: 'voucherCondition',
            key: 'voucherCondition',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Expired Date',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: VoucherDto) => (
                <Space size="middle">
                    {record.status === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.voucherId)}>
                            Delete
                        </Button>
                    ) : (
                        <Button type="primary" danger disabled>
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Vouchers</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-2">
                        <Link to="/createvoucher">
                            <Button type="primary">Create Voucher</Button>
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-4">
                        <Input
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyPress={handleSearchSubmit}
                            allowClear
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={vouchers}
                    rowKey="voucherId"
                    pagination={false} // Disable default pagination
                />

                <div className="row mt-4">
                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={totalCount}
                        showSizeChanger={false}
                        onChange={(page) => setPageIndex(page)}
                        onShowSizeChange={() => { }}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            </main>
        </>
    );
};

export default VoucherPage;
