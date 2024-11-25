import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { AssignTableforbook, AssignTableforCustomer, GetAllTableOfStatusEmpty, UnAssignTableforbook, UnAssignTableforCustomer } from "../../services/table-services";
import { Link } from "react-router-dom";
import { Button, Select, Table, Space, Pagination, message, Tag, notification, TableColumnsType } from "antd";
import { SyncOutlined, LeftOutlined, RightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import form from "antd/es/form";

const AssignCustomerPage = () => {
    const [tables, setTable] = useState<TableDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [filterTableType, setFilterTableType] = useState('');
    const [filterActiveStatus, setFilterActiveStatus] = useState('Empty');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(false); // To handle loading state during password change
    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
            setTable(response.items);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
            setTotalCount(response.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder]);

    const handleFilterStatusChange = async (value: string) => {
        setFilterActiveStatus(value);
        const response = await GetAllTableOfStatusEmpty(filterTableType, value, filterStatus, sortColumn, sortOrder, 1, 8);
        setTable(response.value.items);
        setHasNextPage(response.hasNextPage);
        setHasPreviousPage(response.hasPreviousPage);
        setTotalCount(response.totalCount);
    };

    const handleAssign = async (tableId: string) => {
        setLoading(true);
        try {
            console.log("Assigning table with id: ", tableId);
            const response = await AssignTableforCustomer(tableId);

            if (response && response.isSuccess) {
                notification.success({
                    message: 'Xếp bàn thành công',
                    description: 'Bàn đã được xếp thành công!. Bạn có thể kiểm tra bàn trong danh sách bàn.',
                });
            } else {
                notification.error({
                    message: 'Xếp bàn thất bại',
                    description: response.errors[0].message || 'Có lỗi xảy ra khi xếp bàn.',
                });
            }
        } catch (error) {
            console.error("Error assigning table:", error);
        }
        finally {
            setLoading(false); // Set loading to false after the operation finishes
        }
    };

    const handleUnAssign = async (tableId: string) => {
        setLoading(true); // Set loading to true when submitting the form
        try {
            console.log("Unassigning table with id: ", tableId);
            const response = await UnAssignTableforCustomer(tableId);

            // Kiểm tra nếu response có thông báo lỗi
            if (response && response.isSuccess) {
                notification.success({
                    message: 'Hủy bàn thành công',
                    description: 'Bàn đã được hủy thành công!. Bạn có thể kiểm tra bàn trong danh sách bàn.',
                });
            } else {
                notification.error({
                    message: 'Hủy bàn thất bại',
                    description: response.errors[0].message || 'Có lỗi xảy ra khi hủy bàn.',
                });
            }
        } catch (error) {
            console.error("Error unassigning table:", error);
            // message.error(error.message || 'Error unassigning table');
        }
    };
    const handleAssignBook = async (tableId: string) => {
        setLoading(true); // Set loading to true when submitting the form
        try {
            console.log("Assigning table with id: ", tableId);
            const response = await AssignTableforbook(tableId);
            setTable(response.value.items);
            if (response && response.isSuccess) {
                notification.success({
                    message: 'Xếp bàn thành công',
                    description: 'Bàn đã được xếp thành công!. Bạn có thể kiểm tra bàn trong danh sách bàn.',
                });
            } else {
                notification.error({
                    message: 'Xếp bàn thất bại',
                    description: response.errors[0].message || 'Có lỗi xảy ra khi xếp bàn.',
                });
            }
        }
        catch (error) {
            console.error("Error assigning table:", error);
        }
        finally {
            setLoading(false); // Set loading to false after the operation finishes
        }
    }
    // const handleUnAssignBook = async (tableId: string) => {
    //     try {
    //         console.log("Unassigning table with id: ", tableId);
    //         await UnAssignTableforbook(tableId);
    //         const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
    //         setTable(response.value.items);
    //         message.success('Table unassigned successfully!');

    //     }
    //     catch (error) {
    //         console.error("Error unassigning table:", error);
    //         message.error('Error unassigning table');
    //     }
    // }

    const columns: TableColumnsType<TableDto> = [
        {
            title: 'Table Id',
            dataIndex: 'tableId',
            key: 'tableId',
        },
        {
            title: 'TableType Name',
            dataIndex: 'tableTypeName',
            key: 'tableTypeName',
        },
        {
            title: 'Status',
            dataIndex: 'tableStatus',
            key: 'tableStatus',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : status === 'InActive' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Active Status',
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render: (Acstatus: string) => {
                return (
                    <Tag color={Acstatus === 'Occupied' ? 'green' : Acstatus === 'Empty' ? 'red' : Acstatus === 'Booked' ? 'yellow' : ''}>
                        {Acstatus}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            render: (text: any, record: TableDto) => (
                <Space size="middle">
                    {record.activeStatus === 'Empty' ? (
                        <>
                            <Button icon={<CheckOutlined />} type="primary" onClick={() => handleAssign(record.tableId)}>Assign</Button>
                        </>
                    ) : record.activeStatus === 'Booked' ? (
                        <>
                            <Button icon={<CheckOutlined />} type="primary" onClick={() => handleAssignBook(record.tableId)}>Assign</Button>
                        </>
                    ) : (
                        <Button icon={<CloseOutlined />} type="primary" danger onClick={() => handleUnAssign(record.tableId)}>UnAssign</Button>
                    )}
                </Space>
            ),
        },

    ];

    return (
        <div>
            <div className="row mb-3">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                            <li className="breadcrumb-item"><Link to="/tables">Tables</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Table Assign</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row mb-3">
                <Space size="middle">
                    <Select
                        defaultValue={filterActiveStatus}
                        onChange={handleFilterStatusChange}
                        style={{ width: 150 }}
                    >
                        <Select.Option value="Empty">Empty</Select.Option>
                        <Select.Option value="Booked">Booked</Select.Option>
                        <Select.Option value="Occupied">Occupied</Select.Option>
                    </Select>
                </Space>
            </div>

            <Table<TableDto>
                bordered
                columns={columns}
                dataSource={tables}
                scroll={{ x: 'max-content' }}
                rowKey="tableId"
                pagination={false} // Disable default pagination of Table component
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={setPageIndex} // Cập nhật pageIndex khi người dùng thay đổi trang
                showSizeChanger={false}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                disabled={loading} // Vô hiệu hóa phân trang khi đang tải dữ liệu
                showQuickJumper={false}
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
    );
};

export default AssignCustomerPage;
