import { useEffect, useState } from "react";
import { TableTypeDto } from "../../models/tabletypeDto";
import { GetAllTableType, GetAllTableTypes } from "../../services/tabletype-services";
import { render } from "react-dom";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, Pagination, Space, Table } from "antd";
import { Link } from "react-router-dom";

const TableTypesPage = () => {
    const [tableTypes, setTableTypes] = useState<TableTypeDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllTableType(searchTerm, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
            setTableTypes(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm, filterStatus, sortColumn, sortOrder]);

    const columns = [
        {
            title: 'TableType',
            dataIndex: 'tableTypeName',
            key: 'tableTypeName'
        },
        {
            title: 'Table Capacity',
            dataIndex: 'capacity',
            key: 'capacity'
        },
        {
            title: 'Table Price',
            dataIndex: 'tablePrice',
            key: 'tablePrice'
        },
        {
            title: 'Image Url',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Table Image" style={{ width: '50px', height: '50px' }} />
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: string, record: TableTypeDto) => (
                <Space size="middle">
                    <Link to={`/tabletypes/update/${record.tableTypeId}`}>
                        <Button type="primary">Update</Button>
                    </Link>
                    <Button type="primary">Delete</Button>
                </Space>
            )
        }
    ]

    return (
        <>
            <div className="row mb-3">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">TableTypes</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row mb-3">
                <Space>
                    <Link to="/createtabletype">
                        <Button type="primary">Create TableType</Button>
                    </Link>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={tableTypes}
                rowKey="tableTypeId"
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
        </>
    )
}
export default TableTypesPage;