import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { DeleteTable, GetAllTables, RestoreTable } from "../../services/table-services";
import { Link } from "react-router-dom";
import { Table, Button, Input, Pagination, Space, message, Tag, notification, TableColumnsType, Modal } from "antd";
import { DeleteOutlined, FormOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";

const TablePage = () => {
    const [tables, setTables] = useState<TableDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
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
        Modal.confirm({
            title: 'Bạn có thực sự muốn xoá bàn này?',
            icon: <DeleteOutlined />,
            content: 'Chọn "Đồng ý" để xoá bàn này, chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    const result = await DeleteTable(id)
                    if (result && result.isSuccess) {
                        const results = await GetAllTables(pageSize, pageIndex, searchTerm);
                        setTables(results.items);
                        notification.success({
                            message: 'Xoá thành công',
                            description: 'Bàn đã được xoá',
                        })
                    } else {
                        notification.error({
                            message: 'Xoá thất bại',
                            description: 'Xoá bàn thất bại',
                        })
                    }
                } catch (error) {
                    message.error('Failed to delete table');
                }
            }
        });
    };

    const handleRestore = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có thực sự muốn khôi phục bàn này?',
            icon: <RedoOutlined />,
            content: 'Chọn "Đồng ý" để khôi phục bàn này, chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    const result = await RestoreTable(id)
                    if (result && result.isSuccess) {
                        const results = await GetAllTables(pageSize, pageIndex, searchTerm);
                        setTables(results.items);
                        notification.success({
                            message: 'Khôi phục thành công',
                            description: 'Bàn đã được khôi phục',
                        })
                    } else {
                        notification.error({
                            message: 'Khôi phục thất bại',
                            description: 'Khôi phục bàn thất bại',
                        })
                    }

                } catch (error) {
                    message.error('Failed to restore table');
                }
            }
        });
    };

    const columns: TableColumnsType<TableDto> = [
        {
            title: 'No.',
            key: 'rowNumber',
            render: (text: string, record: TableDto, index: number) => {
                const rowNumber = sortOrder === 'asc'
                    ? (pageIndex - 1) * pageSize + (index + 1)
                    : totalCount - (pageIndex - 1) * pageSize - index;
                return rowNumber;
            },
        },
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
                <Tag color={status === 'Active' ? 'green' : 'red'}>
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
                    {record.tableStatus === 'Active' ? (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.tableId)}>Delete</Button>
                    ) : (
                        <Button icon={<RedoOutlined />} style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.tableId)}>Restore</Button>
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
                        <Button type="primary" icon={<FormOutlined />}>Create Table</Button>
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

            <Table<TableDto>
                bordered
                columns={columns}
                dataSource={tables}
                scroll={{ x: 'max-content' }}
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

export default TablePage;
