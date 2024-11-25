import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Select, Input, Button, Pagination, Tag, Space, notification, TableColumnsType } from "antd";
import { CustomerDto } from "../../models/customerDto";
import { DeleteCustomer, GetAllCustomer, GetCusGender, GetCusStatus, GetFilterTypeCus, GetSreachCus, RestoreCustomer } from "../../services/customer-services";

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
        setTotalCount(results.totalCount);
    };

    // Filter by gender
    const handleFilterGenderChange = async (value: string) => {
        setFilterGender(value);
        const results = await GetCusGender(pageSize, pageIndex, value);
        setCustomers(results.items);
        setTotalCount(results.totalCount);
    };

    // Filter by status
    const handleFilterStatusChange = async (value: string) => {
        setFilterStatus(value);
        const results = await GetCusStatus(pageSize, pageIndex, value);
        setCustomers(results.items);
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
            setCustomers(results.items);
            setTotalCount(results.totalCount);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const result = await DeleteCustomer(id)
            console.log(result);
            if (result && result.isSuccess) {
                const results = await GetAllCustomer(filterUserType, filterGender, filterStatus, searchTerm, pageIndex, pageSize, sortColumn, sortOrder);
                setCustomers(results.items);
                notification.success({
                    message: 'Xoá thành công!',
                    description: 'Khách hàng đã được xoá khỏi hệ thống. Email thông báo đã được gửi đến khách hàng',
                })
            } else {
                notification.error({
                    message: 'Xoá thất bại!',
                    description: 'Có lỗi xảy ra khi xoá khách hàng',
                })
            }
        } catch (error) {
            notification.error({
                message: 'Xoá thất bại!',
                description: 'Có lỗi xảy ra khi xoá khách hàng',
            })
        }
    }
    const handleRestore = async (id: string) => {
        try {
            const result = await RestoreCustomer(id)
            console.log(result);
            if (result && result.isSuccess) {
                const results = await GetAllCustomer(filterUserType, filterGender, filterStatus, searchTerm, pageIndex, pageSize, sortColumn, sortOrder);

                setCustomers(results.items);
                notification.success({
                    message: 'Khôi phục thành công!',
                    description: 'Khách hàng đã được khôi phục. Email thông báo đã được gửi đến khách hàng',
                })
            } else {
                notification.error({
                    message: 'Khôi phục thất bại!',
                    description: 'Có lỗi xảy ra khi khôi phục khách hàng',
                })
            }
        } catch (error) {
            notification.error({
                message: 'Khôi phục thất bại!',
                description: 'Có lỗi xảy ra khi khôi phục khách hàng',
            })
        }
    }
    // Columns for Ant Design Table
    const columns: TableColumnsType<CustomerDto> = [
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
                <Tag color={status === 'Active' ? 'green' : status === 'Deleted' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Loại khách hàng',
            dataIndex: 'customerType',
            key: 'customerType',
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            render: (text: string, record: CustomerDto) => (
                <Space size="middle">
                    {record.customerStatus === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.userId)}>Delete</Button>
                    ) : (
                        <Button style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.userId)}>Restore</Button>
                    )}
                </Space>

            )
        }
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
                    <Select value={filterUserType} onChange={handleFilterUserType} style={{ width: '100%' }} >
                        <Option value="">Customer Type</Option>
                        <Option value="Subscriber">Subscriber</Option>
                        <Option value="Normal">Normal</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select value={filterGender} onChange={handleFilterGenderChange} style={{ width: '100%' }} >
                        <Option value="">Gender</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Orther">Other</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select value={filterStatus} onChange={handleFilterStatusChange} style={{ width: '100%' }} >
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

            <Table<CustomerDto>
                bordered
                columns={columns}
                dataSource={customers}
                scroll={{ x: 'max-content' }}
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
