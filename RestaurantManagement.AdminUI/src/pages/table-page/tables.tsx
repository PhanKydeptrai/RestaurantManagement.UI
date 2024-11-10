import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { DeleteTable, GetAllTables, RestoreTable } from "../../services/table-services";
import { Link } from "react-router-dom";
import { Table, Button, Input, Pagination, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TableTypePage = () => {
    const [tables, setTables] = useState<TableDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllTables(pageSize, pageIndex, searchTerm);
            setTables(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setPageIndex(1);
            const results = await GetAllTables(pageSize, 1, searchTerm);
            setTables(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await DeleteTable(id);
            const results = await GetAllTables(pageSize, pageIndex, searchTerm);
            setTables(results.items);
            message.success('Table deleted successfully!');
        } catch (error) {
            message.error('Failed to delete table');
        }
    };

    const handleRestore = async (id: string) => {
        try {
            await RestoreTable(id);
            const results = await GetAllTables(pageSize, pageIndex, searchTerm);
            setTables(results.items);
            message.success('Table restored successfully!');
        } catch (error) {
            message.error('Failed to restore table');
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
                    case 'Booked':
                        statusClass = 'text-info';
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
                    {record.tableStatus === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.tableId)}>Delete</Button>
                    ) : (
                        <Button style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.tableId)}>Restore</Button>
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
                            <li className="breadcrumb-item active" aria-current="page">Tables</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row mb-3">
                <Space size="middle">
                    <Link to="/createtable">
                        <Button type="primary">Create Table</Button>
                    </Link>
                    <Link to="/createtabletype">
                        <Button type="primary">Create TableType</Button>
                    </Link>
                    <Link to="/tables/TableStatusEmpty">
                        <Button type="primary">Assign Table</Button>
                    </Link>
                    <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                        suffix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={tables}
                rowKey="tableId"
                pagination={false}
            />

            <Pagination
                current={pageIndex}
                pageSize={pageSize}
                total={totalCount}
                onChange={(page) => setPageIndex(page)}
                showSizeChanger={false}
                style={{ marginTop: 20 }}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
        </div>
    );
};

export default TableTypePage;
