import { Link } from "react-router-dom";
import { CategoryDto } from "../../models/categoryDto";
import React, { useEffect, useState } from "react";
import { DeleteCategory, GetAllCategory, GetCategoryFilter, GetCategorySearch, RestoreCategory, SortCategory } from "../../services/category-service";
import { Breadcrumb, Button, Col, Input, Modal, notification, Pagination, Row, Select, Space, Table, TableColumnsType, Tag } from "antd";
import { ContainerOutlined, DeleteOutlined, EditOutlined, FormOutlined, LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]); // Đây lấy về categories DTO của model Dto
    const [pageIndex, setPageIndex] = useState(1);  // trang mặt định là 1
    const [pageSize] = useState(8); // Số lượng mặt định là 8
    const [hasNextPage, setHasNextPage] = useState(false); // Mặc định không có trang tiếp theo
    const [hasPreviousPage, setHasPreviousPage] = useState(false); // Mặc định không có trang trước
    const [totalCount, setTotalCount] = useState(0); // Mặc định tổng số mục là 0

    const [searchTerm, setSearchTerm] = useState(''); // Mặc định không có từ khóa tìm kiếm
    const [filter, setFilter] = useState(''); // Mặc định không có bộ lọc
    const [sortColumn, setSortColumn] = useState(''); // Mặc định không có cột sắp xếp
    const [sortOrder, setSortOrder] = useState(''); // Mặc định không có thứ tự sắp xếp
    const [loading, setLoading] = useState(false); // Mặc định không có trạng thái tải

    // use Effect tải dữ liệu từ API - cụ thể ở đây là GetAllCategory
    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setCategories(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filter, searchTerm, sortColumn, sortOrder]); // Include pageSize in the dependency array

    //#region Filter
    // Hàm xử lý thay đổi trạng thái bộ lọc (Active, InActive, All)
    const handleFilterStatusChange = async (value: string) => {
        setFilter(value);
        const results = await GetCategoryFilter(pageSize, pageIndex, value);
        setPageIndex(1);
        setCategories(results.items);
        setTotalCount(results.totalCount);
    };
    //#endregion

    //#region Search
    // Hàm xử lý thay đổi từ khóa tìm kiếm và gửi yêu cầu tìm kiếm
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetCategorySearch(pageSize, pageIndex, searchTerm);
            setPageIndex(1);
            setCategories(results.items);
            setTotalCount(results.totalCount);
        };
    };
    //#endregion

    //#region Sort
    const handleSortChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
        const results = await SortCategory(8, pageIndex, sortColumn, event.target.value);
        setPageIndex(pageIndex);
        setCategories(results.items);
        setSortColumn(sortColumn);
        setSortOrder(event.target.value);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    const handleSortChangeColumn = async (event: React.ChangeEvent<HTMLSelectElement>, type: 'column' | 'order') => {
        setSortOrder(event.target.value);
        const results = await SortCategory(8, pageIndex, event.target.value, event.target.value);
        setPageIndex(pageIndex);
        setCategories(results.items);
        setSortColumn(event.target.value);
        setSortOrder(event.target.value);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };
    //#endregion

    //#region Delete and Restore
    // Hàm xử lý xoá loại món (Chuyển trạng thái từ Active sang InActive)
    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Ban có chắc chắn muốn xoá loại món này không?',
            icon: <DeleteOutlined />,
            content: 'Chọn "Đồng ý" để xoá loại món này. Chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                setLoading(true);
                try {
                    const result = await DeleteCategory(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
                        setCategories(results.items);

                        notification.success({
                            message: 'Xoá loại món thành công',
                            description: 'Loại món đã được xoá',
                        });
                    } else {
                        notification.error({
                            message: 'Xoá loại món thất bại',
                            description: result.error[0]?.message || 'Xoá loại món không thành công',
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Xoá loại món thất bại',
                        description: 'Xoá loại món không thành công',
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleRestore = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn khôi phục loại món này không?',
            icon: <RedoOutlined />,
            content: 'Chọn "Đồng ý" để khôi phục loại món này. Chọn "Huỷ" để thoát.',
            okText: 'Đồng ý',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: async () => {
                setLoading(true);
                try {
                    const result = await RestoreCategory(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
                        setCategories(results.items);

                        notification.success({
                            message: 'Khôi phục loại món thành công',
                            description: 'Loại món đã được khôi phục',
                        });
                    } else {
                        notification.error({
                            message: 'Khôi phục loại món thất bại',
                            description: 'Khôi phục loại món không thành công',
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Khôi phục loại món thất bại',
                        description: 'Khôi phục loại món không thành công',
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };
    //#endregion

    const columns: TableColumnsType<CategoryDto> = [
        {
            title: 'No.',
            key: 'rowNumber',
            render: (text: string, record: CategoryDto, index: number) => {
                const rowNumber = sortOrder === 'asc'
                    ? (pageIndex - 1) * pageSize + (index + 1)
                    : (totalCount - (pageIndex - 1) * pageSize - index); // Đảo ngược số thứ tự khi sắp xếp DESC
                return rowNumber;
            }
        },
        { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
        {
            title: 'Status', dataIndex: 'categoryStatus', key: 'categoryStatus',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : status === 'InActive' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Category Image', dataIndex: 'imageUrl', key: 'image',
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Category" style={{ width: 50, height: 50, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Action', key: 'action', fixed: 'right', render: (text: string, record: CategoryDto) => (
                <Space size="middle">
                    <Link to={`/categories/updatecategory/${record.categoryId}`}><Button type="primary" icon={<EditOutlined />}>Update</Button></Link>
                    <Link to={`/categories/detailcategory/${record.categoryId}`}><Button type="primary" icon={<ContainerOutlined />}>Detail</Button></Link>
                    {record.categoryStatus === 'Active' ? (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.categoryId)}>Delete</Button>
                    ) : (
                        <Button icon={<RedoOutlined />} style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.categoryId)}>Restore</Button>
                    )}
                </Space>
            )
        },
    ];

    return (
        <>
            <main>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Category</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/categories/createcategory">
                                <Button type="primary" icon={<FormOutlined />} block>Create</Button>
                            </Link>
                        </div>
                        <div className="col-md-2">
                            <Select value={filter} onChange={handleFilterStatusChange} style={{ width: '100%' }}>
                                <Option value="">All</Option>
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                            </Select>
                        </div>
                        {/* <div className="col-md-2">
                            <Select value={sortColumn} onChange={handleSortChangeColumn} style={{ width: '100%' }}>
                                <Option value="">Sort Column</Option>
                                <Option value="categoryId">A-Z</Option>
                            </Select>
                        </div> */}
                        <div className="col-md-2">
                            <Select value={sortOrder} onChange={(value) => handleSortChangeColumn({ target: { value } } as React.ChangeEvent<HTMLSelectElement>, 'order')} style={{ width: '100%' }}>
                                <Option value="">Normal</Option>
                                <Option value="asc">Ascending</Option>
                                <Option value="desc">Descending</Option>
                            </Select>
                        </div>
                        <div className="col-md-4">
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchSubmit}
                            />
                        </div>
                    </div>
                    <div className="mt-5"></div>
                    <Table<CategoryDto>
                        bordered
                        columns={columns}
                        dataSource={categories}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                        rowKey="categoryId"
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
                </div>
            </main>
        </>
    );
};

export default CategoryPage;
