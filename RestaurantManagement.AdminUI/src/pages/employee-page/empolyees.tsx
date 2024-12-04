import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Select, Input, Space, Pagination, Row, Col, Breadcrumb, Tag, notification, TableColumnsType } from 'antd';
import { EmployeeDto } from "../../models/employeeDto";
import { DeleteEmployee, GetAllEmployee, GetEmpGender, GetEmpRole, GetEmpStatus, GetEmpSearch, RestoreEmployee } from "../../services/employee-service";
import { ContainerOutlined, DeleteOutlined, FormOutlined, LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons';
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
            setEmployees(results.items);
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
        setLoading(true);
        try {
            // Gọi API xóa nhân viên
            const result = await DeleteEmployee(id);

            // Kiểm tra kết quả trả về của API
            if (result && result.isSuccess) {
                // Nếu xóa thành công, cập nhật lại danh sách nhân viên
                const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
                setEmployees(results.items);

                notification.success({
                    message: 'Xoá thành công!',
                    description: 'Nhân viên đã được xoá thành công!',
                });
            } else {
                // Nếu API không trả về thành công
                notification.error({
                    message: 'Xoá thất bại!',
                    description: result.errors[0]?.message || 'Nhân viên chưa được xoá!',
                });
            }
        }
        catch (error) {
            // Xử lý lỗi khi gọi API
            console.error('Error deleting employee:', error);
            notification.error({
                message: 'Xoá Thất Bại!',
                description: 'An unexpected error occurred while deleting the employee.',
            });
        } finally {
            setLoading(false);
        }
    };


    const handleRestore = async (id: string) => {
        setLoading(true);
        try {
            const result = await RestoreEmployee(id);
            if (result && result.isSuccess) {
                const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, '', '', pageSize, pageIndex);
                setEmployees(results.items);
                notification.success({
                    message: 'Khôi phục nhân viên thành công!',
                    description: 'Nhân viên đã được khôi phục thành công!',
                });
            } else {
                notification.error({
                    message: 'Khôi phục nhân viên thất bại!',
                    description: 'Nhân viên chưa được khôi phục!',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Khôi Phục Thất Bại!',
                description: 'This employee has not been restored!',
            });
        } finally {
            setLoading(false);
        }
    };

    const columns: TableColumnsType<EmployeeDto> = [
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Fisrt Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Status',
            dataIndex: 'employeeStatus',
            key: 'employeeStatus',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' :
                    status === 'Deleted' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (text: string, record: EmployeeDto) => (
                <Space size="middle">
                    <Link to={`detailemployee/${record.userId}`}><Button type="primary" icon={<ContainerOutlined />}>Detail</Button></Link>
                    {record.employeeStatus === 'Active' ? (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.userId)}>Delete</Button>
                    ) : (
                        <Button icon={<RedoOutlined />} style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.userId)}>Restore</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <main>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Employees</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <div className="row">
                <div className="col-md-2">
                    <Link to="/createemployee">
                        <Button type="primary" icon={<FormOutlined />} block>Create</Button>
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
                        <Option value="Orther">Orther</Option>
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

            <Table<EmployeeDto>
                bordered
                columns={columns}
                scroll={{ x: 'max-content' }}
                dataSource={employees}
                pagination={false}
                rowKey="userId"
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={setPageIndex}
                showSizeChanger={false} // Ẩn tùy chọn thay đổi kích thước trang
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} // Hiển thị tổng số mục
                disabled={loading} // Vô hiệu hóa phân trang khi đang tải dữ liệu
                showQuickJumper={false} // Tắt chức năng nhảy nhanh giữa các trang
                prevIcon={
                    hasPreviousPage ? (
                        <LeftOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Mũi tên trái (Previous) nếu có trang trước
                    ) : (
                        <LeftOutlined style={{ fontSize: 16, color: 'grey' }} /> // Mũi tên trái (Previous) màu xám nếu không có trang trước
                    )
                }
                nextIcon={
                    hasNextPage ? (
                        <RightOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Mũi tên phải (Next) nếu có trang tiếp theo
                    ) : (
                        <RightOutlined style={{ fontSize: 16, color: 'grey' }} /> // Mũi tên phải (Next) màu xám nếu không có trang tiếp theo
                    )
                }
            />
        </main>
    );
};

export default EmployeePage;
