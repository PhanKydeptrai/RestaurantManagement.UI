import { Link } from "react-router-dom";
import { CategoryDto } from "../../models/categoryDto";
import React, { useEffect, useState } from "react";
import { DeleteCategory, GetAllCategory, GetCategoryFilter, GetCategorySearch, RestoreCategory, SortCategory } from "../../services/category-service";
import { Breadcrumb, Button, Col, Input, Pagination, Row, Select, Space, Table, Tag } from "antd";

const { Option } = Select;

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

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

    //#region Pagination
    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPageIndex(pageIndex + 1);
        }
    };
    //#endregion

    //#region Filter
    const handleFilterStatusChange = async (value: string) => {
        setFilter(value);
        const results = await GetCategoryFilter(pageSize, pageIndex, value);
        setPageIndex(1);
        setCategories(results.value.items);
        setHasNextPage(results.value.hasNextPage);
        setHasPreviousPage(results.value.haspreviousPage);
        setTotalCount(results.value.totalCount);
    };
    //#endregion

    //#region Search
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetCategorySearch(pageSize, pageIndex, searchTerm);
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
    const handleDelete = async (id: string) => {
        await DeleteCategory(id);
        const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
        setCategories(results.items);
    };

    const handleRestore = async (id: string) => {
        await RestoreCategory(id);
        const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
        setCategories(results.items);
    };
    //#endregion

    const columns = [
        { title: 'Tên loại món', dataIndex: 'categoryName', key: 'categoryName' },
        {
            title: 'Trạng thái', dataIndex: 'categoryStatus', key: 'categoryStatus',
            render: (status: string) => (
                <Tag color={status === 'Active' ? 'green' : status === 'InActive' ? 'red' : ''}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Hình ảnh', dataIndex: 'imageUrl', key: 'image',
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Category" style={{ width: 50, height: 50, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Action', key: 'action', render: (text: string, record: CategoryDto) => (
                <Space size="middle">
                    <Link to={`/categories/updatecategory/${record.categoryId}`}><Button type="primary">Update</Button></Link>
                    <Link to={`/categories/detailcategory/${record.categoryId}`}><Button type="primary">Detail</Button></Link>
                    {record.categoryStatus === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.categoryId)}>Delete</Button>
                    ) : (
                        <Button style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.categoryId)}>Restore</Button>
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
                                <Button type="primary" block>Create</Button>
                            </Link>
                        </div>
                        <div className="col-md-2">
                            <Select defaultValue="" onChange={handleFilterStatusChange} style={{ width: '100%' }}>
                                <Option value="">Filter</Option>
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
                                <Option value="">Sort Order</Option>
                                <Option value="asc">Ascending</Option>
                                <Option value="desc">Descending</Option>
                            </Select>
                        </div>
                        <div className="col-md-4">
                            <Input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchSubmit}
                            />
                        </div>
                    </div>
                    <div className="mt-5"></div>
                    <Table
                        columns={columns}
                        dataSource={categories}
                        pagination={false}
                        rowKey="categoryId"
                    />
                    <Pagination
                        current={pageIndex}
                        total={totalCount}
                        pageSize={pageSize}
                        onChange={setPageIndex}
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            </main>
        </>
    );
};

export default CategoryPage;
