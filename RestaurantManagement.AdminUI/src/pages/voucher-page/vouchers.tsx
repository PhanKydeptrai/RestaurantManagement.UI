import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VoucherDto } from "../../models/voucherDto";
import { DeleteVoucher, GetAllVouchers } from "../../services/voucher-services";
import { Button, Input, Table, Pagination, notification, Tag, Space, TableColumnsType, Modal } from "antd";
import { DeleteOutlined, FormOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

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
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xoá voucher này?',
            icon: <DeleteOutlined />,
            content: 'Chọn "Đồng ý" để xoá voucher này, chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                setLoading(true);
                try {
                    const result = await DeleteVoucher(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllVouchers(pageSize, pageIndex, searchTerm);
                        setVouchers(results.items);
                        notification.success({
                            message: 'Xoá thành công',
                            description: 'Voucher đã được xoá thành công',
                        });
                    } else {
                        notification.error({
                            message: 'Xoá thất bại',
                            description: result.error[0]?.message || 'Đã có lỗi xảy ra trong quá trình xoá voucher',
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Delete failed',
                        description: 'Delete voucher failed',
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const columns: TableColumnsType<VoucherDto> = [
        {
            title: 'Voucher Name',
            dataIndex: 'voucherName',
            key: 'voucherName',
        },
        {
            title: 'Voucher Code',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
        },
        {
            title: 'Max Discount',
            dataIndex: 'maximumDiscountAmount',
            key: 'maxDiscoumaximumDiscountAmountntAmount',
        },
        {
            title: 'Minimum Order Amount',
            dataIndex: 'minimumOrderAmount',
            key: 'minimumOrderAmount',
        },
        {
            title: 'Voucher Condition',
            dataIndex: 'voucherConditions',
            key: 'voucherConditions',
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
            fixed: 'right',
            render: (text: string, record: VoucherDto) => (
                <Space size="middle">
                    {record.status === 'Active' ? (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.voucherId)}>
                            Delete
                        </Button>
                    ) : (
                        <Button type="primary" danger icon={<DeleteOutlined />} disabled>
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
                            <Button type="primary" icon={<FormOutlined />}>Create Voucher</Button>
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

                <Table<VoucherDto>
                    bordered
                    scroll={{ x: 'max-content' }}
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
