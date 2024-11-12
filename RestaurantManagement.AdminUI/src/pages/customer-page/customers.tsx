import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Select, Input, Button, Pagination, Tag } from "antd";
import { CustomerDto } from "../../models/customerDto";
import { GetAllCustomer, GetCusGender, GetCusStatus, GetFilterTypeCus, GetSreachCus } from "../../services/customer-services";

const { Option } = Select;

const CustomerPage = () => {

    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterUserType, setFilterUserType] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllCustomer(filterUserType, filterGender, filterStatus, searchTerm, pageIndex, pageSize, sortColumn, sortOrder);
            setCustomers(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filterUserType, filterGender, filterStatus, searchTerm]); // Include relevant dependencies


    // Filter by user type
    const handleFilterUserType = async (value: string) => {
        setFilterUserType(value);
        const results = await GetFilterTypeCus(value, pageIndex, pageSize);
        setCustomers(results.items);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    // Filter by gender
    const handleFilterGenderChange = async (value: string) => {
        setFilterGender(value);
        const results = await GetCusGender(pageSize, pageIndex, value);
        setCustomers(results.items);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    // Filter by status
    const handleFilterStatusChange = async (value: string) => {
        setFilterStatus(value);
        const results = await GetCusStatus(pageSize, pageIndex, value);
        setCustomers(results.items);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    // Handle search term
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handle search submit (Enter key press)
    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetSreachCus(searchTerm, pageIndex, pageSize);
            setPageIndex(1);
            setCustomers(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
    };

    // Columns for Ant Design Table
    const columns = [
        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'customerStatus',
            key: 'customerStatus',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : status === 'InActive' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Loại khách hàng',
            dataIndex: 'customerType',
            key: 'customerType',
        },
    ];

    return (
        <main>
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Customers</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-2">
                    {/* You can add a "Create" button here if needed */}
                </div>
                <div className="col-md-2">
                    <Select

                        value={filterUserType}
                        onChange={handleFilterUserType}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Customer Type</Option>
                        <Option value="Subscriber">Subscriber</Option>
                        <Option value="Normal">Normal</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select

                        value={filterGender}
                        onChange={handleFilterGenderChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Gender</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Orther">Other</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select

                        value={filterStatus}
                        onChange={handleFilterStatusChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>
                <div className="col-md-4">
                    <Input
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={customers}
                rowKey="userId"
                pagination={false}  // Disable the default pagination of Ant Design Table
            />

            <div className="row mt-5">
                <Pagination
                    current={pageIndex}
                    total={totalCount}
                    pageSize={pageSize}
                    onChange={setPageIndex}
                    pageSizeOptions={['8', '16', '32']}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}

                />
            </div>
        </main>
    );
};

export default CustomerPage;
