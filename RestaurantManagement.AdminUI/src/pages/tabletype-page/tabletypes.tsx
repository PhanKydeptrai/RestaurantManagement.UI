import { useEffect, useState } from "react";
import { TableTypeDto } from "../../models/tabletypeDto";
import { DeleteTableType, GetAllTableType, GetAllTableTypes, RestoreTableType } from "../../services/tabletype-services";
import { render } from "react-dom";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, message, Modal, notification, Pagination, Space, Table, TableColumnsType, Tag } from "antd";
import { DeleteOutlined, EditOutlined, FormOutlined, RedoOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const TableTypesPage = () => {
    const [tableTypes, setTableTypes] = useState<TableTypeDto[]>([]); // lấy lại modelDto
    const [pageIndex, setPageIndex] = useState(1); // set trang index bắt đầu luôn luôn =1
    const [pageSize, setPageSize] = useState(8); // page size tối đa =8
    const [hasNextPage, setHasNextPage] = useState(false); // kiểm tra có trang tiếp theo kh
    const [hasPreviousPage, setHasPreviousPage] = useState(false); // kiểm tra có trang trc kh
    const [totalCount, setTotalCount] = useState(0); // đếm tổng số lượng của table type
    const [searchTerm, setSearchTerm] = useState('');// dùng để xử hàm search
    const [filterStatus, setFilterStatus] = useState(''); // xử lí filtẻ
    const [sortColumn, setSortColumn] = useState('');// sort column
    const [sortOrder, setSortOrder] = useState(''); // sort index
    useEffect(() => { // lấy ra thông tin khi rendẻ component
        const fetchData = async () => {
            const results = await GetAllTableType(searchTerm, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
            setTableTypes(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm, filterStatus, sortColumn, sortOrder]);

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có thực sự muốn xoá loại bàn này?',
            icon: <DeleteOutlined />,
            content: 'Chọn "Đồng ý" để xoá loại bàn này, chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    const result = await DeleteTableType(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllTableType(searchTerm, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
                        setTableTypes(results.items);
                        notification.success({
                            message: 'Xoá loại bàn thành công',
                            description: 'Loại bàn đã được xoá'
                        });
                    } else {
                        notification.error({
                            message: 'Xoá loại bàn thất bại',
                            description: result.error[0]?.message || 'Xoá loại ban không thành công'
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Xoá thất bại',
                        description: 'Xoá loại bàn không thành công'
                    });
                }
            }
        });
    }

    const handleRestore = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có muốn khôi phục loại bàn này?',
            icon: <RedoOutlined />,
            content: 'Chọn "Đồng ý" để khôi phục loại bàn này, chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    const result = await RestoreTableType(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllTableType(searchTerm, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
                        setTableTypes(results.items);
                        notification.success({
                            message: 'Khôi phục loại bàn thành công',
                            description: 'Loại bàn đã được khôi phục'
                        });
                    } else {
                        notification.error({
                            message: 'Khôi phục loại bàn thất bại',
                            description: result.error[0]?.message || 'Khôi phục loại bàn không thành công'
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Khôi phục thất bại',
                        description: 'Khôi phục loại bàn không thành công'
                    });
                }
            }
        });
    }

    const columns: TableColumnsType<TableTypeDto> = [
        {
            title: 'No.',
            key: 'rowNumber',
            render: (text: string, record: TableTypeDto, index: number) => {
                const rowNumber = sortOrder === 'asc'
                    ? (pageIndex - 1) * pageSize + (index + 1)
                    : (totalCount - (pageIndex - 1) * pageSize - index);
                return rowNumber;
            }
        },
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
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Table Image" style={{ width: '50px', height: '50px' }} />
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : status === 'InActive' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            render: (text: string, record: TableTypeDto) => (
                <Space size="middle">
                    <Link to={`/tabletypes/update/${record.tableTypeId}`}>
                        <Button type="primary" icon={<EditOutlined />}>Update</Button>
                    </Link>
                    {record.status === 'Active' ? (
                        <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.tableTypeId)}>Delete</Button>
                    ) : (
                        <Button icon={<RedoOutlined />} style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.tableTypeId)}>Restore</Button>
                    )}
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
                        <Button type="primary" icon={<FormOutlined />}>Create TableType</Button>
                    </Link>
                </Space>
            </div>
            <Table<TableTypeDto>
                bordered
                columns={columns}
                scroll={{ x: 'max-content' }}
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