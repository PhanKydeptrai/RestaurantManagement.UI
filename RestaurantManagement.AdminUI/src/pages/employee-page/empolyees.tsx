import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Select, Input, Space, Pagination } from 'antd';
import { EmployeeDto } from "../../models/employeeDto";
import { DeleteEmployee, GetAllEmployee, GetEmpGender, GetEmpRole, GetEmpStatus, GetEmpSearch, RestoreEmployee } from "../../services/employee-service";
const { Option } = Select;
const EmployeePage = () => {
    const [employees, setEmployees] = useState<EmployeeDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterGender, setFilterGender] = useState('');
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
            setEmployees(results.items);
            // setPageIndex(results.pageIndex);
            // setPageSize(results.pageSize);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filterGender, filterRole, filterStatus, searchTerm]);

    const handleFilterStatusChange = async (value: string) => {
        setFilterStatus(value);
        const results = await GetEmpStatus(pageSize, pageIndex, value);
        setEmployees(results.value.items);
        setHasNextPage(results.value.hasNextPage);
        setHasPreviousPage(results.value.haspreviousPage);
        setTotalCount(results.length);
    };

    const handleFilterGenderChange = async (value: string) => {
        setFilterGender(value);
        const results = await GetEmpGender(pageSize, pageIndex, value);
        setEmployees(results.items);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.length);
    }

    const handleFilterRoleChange = async (value: string) => {
        setFilterRole(value);
        const results = await GetEmpRole(pageSize, pageIndex, value);
        setEmployees(results.items);
        setTotalCount(results.length);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const results = await GetEmpSearch(pageSize, pageIndex, searchTerm);
            setEmployees(results.items);
            setTotalCount(results.totalCount);
        }
    };

    const handleDelete = async (id: string) => {
        await DeleteEmployee(id);
        const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
        setEmployees(results.items);
    };

    const handleRestore = async (id: string) => {
        await RestoreEmployee(id);
        const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
        setEmployees(results.items);
    };

    const columns = [
        { title: 'Họ', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Trạng thái',
            dataIndex: 'employeeStatus',
            key: 'employeeStatus',
            render: (status: string) => (
                <span className={status === 'Active' ? 'text-success' : 'text-danger'}>{status}</span>
            ),
        },
        { title: 'Chức vụ', dataIndex: 'role', key: 'role' },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: EmployeeDto) => (
                <Space size="middle">
                    <Link to={`detailemployee/${record.userId}`}><Button type="primary">Detail</Button></Link>
                    {record.employeeStatus === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.userId)}>Delete</Button>
                    ) : (
                        <Button style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.userId)}>Restore</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <main>
            <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Employees</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <Link to="/createemployee">
                        <Button type="primary" block>Create</Button>
                    </Link>
                </div>
                <div className="col-md-2">
                    <Select value={filterStatus} onChange={handleFilterStatusChange} style={{ width: '100%' }}>
                        <Option value="">Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Deleted">Deleted</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select value={filterRole} onChange={handleFilterRoleChange} style={{ width: '100%' }}>
                        <Option value="">Role</Option>
                        <Option value="Boss">Admin</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="Receptionist">Receptionist</Option>
                        <Option value="Waiter">Waiter</Option>
                        <Option value="Cashier">Cashier</Option>
                        <Option value="Chef">Chef</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select
                        value={filterGender}
                        onChange={handleFilterGenderChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="">All</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Orther">Other</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Input
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>
            </div>
            <div className="mt-5"></div>

            <Table
                columns={columns}
                dataSource={employees}
                pagination={false}
                rowKey="userId"
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={setPageIndex}
                showSizeChanger={false}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
        </main>
    );
};

export default EmployeePage;
