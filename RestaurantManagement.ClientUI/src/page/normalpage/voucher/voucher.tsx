import { useEffect, useState } from "react";
import { VoucherDto } from "../../../models/voucherDto";
import { GetAllVoucher, VoucherCustomer } from "../../../services/voucher-services";
import { Card, Col, Row, Input, Button, Select, Tag, Space, Pagination } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const VoucherPage = () => {
    const [voucher, setVoucher] = useState<VoucherDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(9); // Setting page size to 9
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token) {
                    const result = await VoucherCustomer(filterStatus, filterType, searchTerm, '', '', pageIndex, pageSize);
                    setVoucher(result.items);
                    setHasNextPage(result.hasNextPage);
                    setHasPreviousPage(result.haspreviousPage);
                    setTotalCount(result.totalCount);
                } else {
                    const result = await GetAllVoucher(filterStatus, filterType, searchTerm, '', '', pageIndex, pageSize);
                    setVoucher(result.items);
                    setHasNextPage(result.hasNextPage);
                    setHasPreviousPage(result.haspreviousPage);
                    setTotalCount(result.totalCount);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [
        pageIndex,
        pageSize,
        searchTerm,
        filterStatus,
        filterType,
    ]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setPageIndex(1); // Reset to first page when searching
    };

    const handleStatusChange = (value: string) => {
        setFilterStatus(value);
        setPageIndex(1); // Reset to first page when changing filters
    };

    const handleTypeChange = (value: string) => {
        setFilterType(value);
        setPageIndex(1); // Reset to first page when changing filters
    };

    const renderVoucherCards = () => {
        return voucher.map((voucherItem) => (
            <Col key={voucherItem.voucherId} xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
                <Card
                    title={voucherItem.voucherName}
                    bordered
                    extra={<Tag color={voucherItem.status === 'Active' ? 'green' : 'red'}>{voucherItem.status}</Tag>}
                    hoverable
                    style={{ width: '100%' }}
                >
                    <p><strong>Voucher Code:</strong> {voucherItem.voucherCode}</p>
                    <p><strong>Max Discount:</strong> {voucherItem.maximumDiscountAmount}</p>
                    <p><strong>Min Order Amount:</strong> {voucherItem.minimumOrderAmount}</p>
                    <p><strong>Start Date:</strong> {voucherItem.startDate}</p>
                    <p><strong>Expired Date:</strong> {voucherItem.expiredDate}</p>
                </Card>
            </Col>
        ));
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <Row gutter={[8, 8]} style={{ marginBottom: 20 }}>
                        <Col xs={24} sm={8}>
                            <Card>
                                <h3>Filters</h3>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Input
                                        placeholder="Search by Voucher Name or Code"
                                        value={searchTerm}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        prefix={<SearchOutlined />}
                                    />
                                    <Select
                                        placeholder="Select Status"
                                        value={filterStatus}
                                        onChange={handleStatusChange}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="">All</Option>
                                        <Option value="Active">Active</Option>
                                        <Option value="Inactive">Inactive</Option>
                                    </Select>
                                    {/* <Select
                                        placeholder="Select Type"
                                        value={filterType}
                                        onChange={handleTypeChange}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="">All</Option>
                                        <Option value="Type1">Type 1</Option>
                                        <Option value="Type2">Type 2</Option>
                                    </Select> */}
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    <h1>Your Vouchers</h1>
                    <Row gutter={[8, 8]}>
                        {renderVoucherCards()}
                    </Row>

                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={totalCount}
                        onChange={(page, pageSize) => {
                            setPageIndex(page);
                            setPageSize(pageSize);
                        }}
                        style={{ marginTop: 20, textAlign: 'center' }}
                    />
                </div>
            </div>
        </>
    );
};

export default VoucherPage;
