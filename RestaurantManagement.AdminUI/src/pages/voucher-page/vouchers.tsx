import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VoucherDto } from "../../models/voucherDto";
import { DeleteVoucher, GetAllVouchers } from "../../services/voucher-services";
import { Button, Input, Table, Pagination, notification, Tag, Space } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const VoucherPage = () => {
    const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
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
            notification.success({ message: "Xoá voucher thành công", description: "Voucher đã được xoá" });
        } catch (error) {
            notification.error({ message: "Error", description: "Xoá thất bại. Vui lòng kiểm tra lại" });
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
                        total={totalCount}
                        pageSize={pageSize}
                        onChange={(page) => setPageIndex(page)} // Cập nhật pageIndex khi người dùng thay đổi trang
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        disabled={loading} // Vô hiệu hóa phân trang khi đang tải dữ liệu
                        prevIcon={
                            hasPreviousPage ? (
                                <LeftOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang trước
                            ) : (
                                <LeftOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang trước
                            )
                        }
                        nextIcon={
                            hasNextPage ? (
                                <RightOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang tiếp theo
                            ) : (
                                <RightOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang tiếp theo
                            )
                        }
                    />
                </div>
            </main>
        </>
    );
};

export default VoucherPage;
