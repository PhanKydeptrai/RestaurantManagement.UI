import { useEffect, useState } from "react";
import { HistoryOrderDto } from "../../models/historyDto";
import { GetHistoryOrder } from "../../services/history-services";
import { Breadcrumb, Col, Pagination, Row, Table } from "antd";
import { Link } from "react-router-dom";

const HistoryOrderPage = () => {
    const [historyOrder, setHistoryOrder] = useState<HistoryOrderDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filterUserId, setFilterUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await GetHistoryOrder(filterUserId, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setHistoryOrder(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filterUserId, searchTerm, sortColumn, sortOrder]);

    const Columns = [
        {
            title: 'User Log Id',
            dataIndex: 'userLogId',
            key: 'userLogId',
        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Log Details',
            dataIndex: 'logDetails',
            key: 'logDetails',
        },
        {
            title: 'Log Date',
            dataIndex: 'logDate',
            key: 'logDate',
        }
    ]
    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/log"><td>Log </td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>History Order</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Table
                columns={Columns}
                dataSource={historyOrder}
                rowKey="userLogId"
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

export default HistoryOrderPage;