import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { AssignTableforbook, AssignTableforCustomer, GetAllTableOfStatusEmpty, UnAssignTableforbook, UnAssignTableforCustomer } from "../../services/table-services";
import { Link } from "react-router-dom";
import { Button, Select, Table, Space, Pagination, message } from "antd";
import { SyncOutlined } from '@ant-design/icons';

const AssignCustomerPage = () => {
    const [tables, setTable] = useState<TableDto[]>([]);
    const [filterTableType, setFilterTableType] = useState('');
    const [filterActiveStatus, setFilterActiveStatus] = useState('Empty');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, page, pageSize);
            setTable(response.value.items);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
            setTotalCount(response.totalCount);
            console.log(response.value.items);
        };
        fetchData();
    }, [page, pageSize, filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder]);

    const handleFilterStatusChange = async (value: string) => {
        setFilterActiveStatus(value);
        const response = await GetAllTableOfStatusEmpty(filterTableType, value, filterStatus, sortColumn, sortOrder, 1, 8);
        setTable(response.value.items);
        setHasNextPage(response.hasNextPage);
        setHasPreviousPage(response.hasPreviousPage);
        setTotalCount(response.totalCount);
    };

    const handleAssign = async (tableId: string) => {
        try {
            console.log("Assigning table with id: ", tableId);
            await AssignTableforCustomer(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setTable(response.value.items);
            message.success('Table assigned successfully!');
        }
        catch (error) {
            console.error("Error assigning table:", error);
            message.error('Error assigning table');
        }
    };
    const handleAssignBook = async (tableId: string) => {
        try {
            console.log("Assigning table with id: ", tableId);
            await AssignTableforbook(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setTable(response.value.items);
            message.success('Table assigned successfully!');
        }
        catch (error) {
            console.error("Error assigning table:", error);
            message.error('Error assigning table');
        }
    }
    const handleUnAssignBook = async (tableId: string) => {
        try {
            console.log("Unassigning table with id: ", tableId);
            await UnAssignTableforbook(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setTable(response.value.items);
            message.success('Table unassigned successfully!');

        }
        catch (error) {
            console.error("Error unassigning table:", error);
            message.error('Error unassigning table');
        }
    }
    const handleUnAssign = async (tableId: string) => {
        try {
            console.log("Unassigning table with id: ", tableId);
            await UnAssignTableforCustomer(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setTable(response.value.items);
            message.success('Table unassigned successfully!');
        }
        catch (error) {
            console.error("Error unassigning table:", error);
            message.error('Error unassigning table');
        }
    };

    const columns = [
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
            render: (text: string) => (
                <span className={text === 'empty' ? 'text-danger' : 'text-success'}>{text}</span>
            ),
        },
        {
            title: 'Active Status',
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render: (text: string) => {
                let statusClass = '';
                switch (text) {
                    case 'Occupied':
                        statusClass = 'text-success';
                        break;
                    case 'Empty':
                        statusClass = 'text-danger';
                        break;
                    default:
                        statusClass = '';
                }
                return <span className={statusClass}>{text}</span>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: TableDto) => (
                <Space size="middle">
                    {record.activeStatus === 'Empty' ? (
                        <>
                            <Button type="primary" onClick={() => handleAssign(record.tableId)}>Assign</Button>
                        </>
                    ) : record.activeStatus === 'Booked' ? (
                        <>
                            <Button type="primary" onClick={() => handleAssignBook(record.tableId)}>Assign</Button>
                        </>
                    ) : (
                        <Button type="default" onClick={() => handleUnAssign(record.tableId)}>UnAssign</Button>
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

            <Table
                columns={columns}
                dataSource={tables}
                rowKey="tableId"
                pagination={false} // Disable default pagination of Table component
            />

            <Pagination
                current={page}
                pageSize={pageSize}
                total={totalCount}
                onChange={(page) => setPage(page)}
                showSizeChanger={false} // Disable size changer, as we are using a fixed page size
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default AssignCustomerPage;
