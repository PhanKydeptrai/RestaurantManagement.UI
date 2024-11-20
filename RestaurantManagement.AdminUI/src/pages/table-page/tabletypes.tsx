import { useEffect, useState } from "react";
import { TableTypeDto } from "../../models/tabletypeDto";
import { GetAllTableTypes } from "../../services/tabletype-services";
import { render } from "react-dom";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, Space, Table } from "antd";

const TableTypePage = () => {
    const [tableTypes, setTableTypes] = useState<TableTypeDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllTableTypes(pageSize, pageIndex, searchTerm);
            setTableTypes(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm]);

    const columns = [
        {
            title: 'TableType',
            dataIndex: 'tableTypeName',
            key: 'tableTypeName'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Table Capacity',
            dataIndex: 'tableCapacity',
            key: 'tableCapacity'
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
            title: 'Table Price',
            dataIndex: 'tablePrice',
            key: 'tablePrice'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: string, record: TableTypeDto) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="primary">Delete</Button>
                </Space>
            )
        }
    ]

    return (
        <>
            <h1>Table Type Page</h1>
            <Table
                columns={columns}
                dataSource={tableTypes}
                rowKey="tableTypeId"
                pagination={false}
            />
        </>
    )
}
export default TableTypePage;