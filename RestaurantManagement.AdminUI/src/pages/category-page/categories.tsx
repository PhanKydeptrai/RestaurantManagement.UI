import { json, Link } from "react-router-dom";
import { CategoryDto } from "../../models/categoryDto";
import React, { useEffect, useState } from "react";
import { DeleteCategory, GetAllCategory, GetCategory, GetCategoryFilter, GetCategorySearch, RestoreCategory, SortCategory } from "../../services/category-service";
import { Button, Input, Pagination, Select, Space, Table } from "antd";

const { Option } = Select;

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            console.log(result.items);
            setCategories(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, filter, searchTerm, sortColumn, sortOrder]); // Include pageSize in the dependency array

    //#region Pagination
    // Xử lý chuyển trang 
    const handlePreviousPage = () => {
        if (hasPreviousPage) { //nếu có trang trước đó
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) { //nếu có trang tiếp theo
            setPageIndex(pageIndex + 1);
        }
    };
    //#endregion

    //#region filter
    const handleFilterStatusChange = async (value: string) => {
        setFilter(value);
        const results = await GetCategoryFilter(pageSize, pageIndex, value);
        setPageIndex(1);
        setCategories(results.value.items);
        setHasNextPage(results.value.hasNextPage);
        setHasPreviousPage(results.value.haspreviousPage);
        setTotalCount(results.value.totalCount);
    }
    //#endregion

    //#region Search

    //truyền tham số cho searchTerm
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    //Thực hiện search
    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetCategorySearch(pageSize, pageIndex, searchTerm);
            setCategories(results.items);
            setTotalCount(results.totalCount);
        };
    }
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
    }
    const handleSortChangeColumn = async (event: React.ChangeEvent<HTMLSelectElement>, type: 'column' | 'order') => {
        // if (type === 'column') {
        //     setSortColumn(event.target.value);
        //     console.log(sortColumn);
        // } else {
        setSortOrder(event.target.value);
        const results = await SortCategory(8, pageIndex, event.target.value, event.target.value);
        setPageIndex(pageIndex);
        setCategories(results.items);
        setSortColumn(event.target.value);
        setSortOrder(event.target.value);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);

        // const column = type === 'column' ? event.target.value : sortColumn;
        // const order = type === 'order' ? event.target.value : sortOrder;
        // const results = await SortCategory(8, pageIndex, column, order);
        // setPageIndex(pageIndex);
        // setCategories(results.items);
        // setHasNextPage(results.hasNextPage);
        // setHasPreviousPage(results.haspreviousPage);
        // setTotalCount(results.totalCount);
    }

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
    }
    //#endregion
    const columns = [
        { title: 'Tên loại món', dataIndex: 'categoryName', key: 'categoryName' },
        {
            title: 'Trạng thái', dataIndex: 'categoryStatus', key: 'categoryStatus',
            render: (categoryStatus: string) => (
                <span className={categoryStatus === 'Active' ? 'text-success' : 'text-danger'}>{categoryStatus}</span>
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
                    <Link to={`/categories/updatecategory/${record.categoryId}`} className="btn btn-primary">Edit</Link>
                    <Link to={`/categories/detailcategory/${record.categoryId}`} className="btn btn-info">Detail</Link>
                    {record.categoryStatus === 'Active' ? (
                        <button className="btn btn-danger" onClick={() => handleDelete(record.categoryId)}>Delete</button>
                    ) : (
                        <button className="btn btn-warning" onClick={() => handleRestore(record.categoryId)}>Restore</button>
                    )}
                </Space>
            )
        },
    ];

    return (
        <>
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/categories/createcategory">
                                <Button className="btn btn-success w-100">Create</Button>
                            </Link>
                        </div>
                        <div className="col-md-2">
                            <Select defaultValue="" onChange={handleFilterStatusChange}>
                                <Option value="">Filter</Option>
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                            </Select>
                        </div>
                        <div className="col-md-2">
                            <Select value={sortColumn}>
                                <Option value="">SortColumn</Option>
                                <Option value="categoryId">A-Z</Option>
                            </Select>
                        </div>

                        <div className="col-md-2">
                            <Select value={sortOrder} onChange={(value) => handleSortChangeColumn({ target: { value } } as React.ChangeEvent<HTMLSelectElement>, 'order')}>
                                <Option value="">SortOrder</Option>
                                <Option value="asc">Ascending</Option>
                                <Option value="desc">Descending</Option>
                            </Select>

                        </div>
                        {/* Component for search */}
                        <div className="col-md-4">
                            <Input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchSubmit}
                            />
                        </div>
                        {/* end */}
                    </div>
                    <div className="mt-5"></div>
                    <Table
                        columns={columns}
                        dataSource={categories}
                        pagination={false}
                        rowKey={"categoryId"}
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