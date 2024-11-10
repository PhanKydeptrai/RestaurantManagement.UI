import { json, Link } from "react-router-dom";
import { CategoryDto } from "../../models/categoryDto";
import { useEffect, useState } from "react";
import { DeleteCategory, GetAllCategory, GetCategory, GetCategoryFilter, GetCategorySearch, RestoreCategory, SortCategory } from "../../services/category-service";


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
    }, [pageIndex, pageSize]); // Include pageSize in the dependency array

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
    const handleFilterStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
        const results = await GetCategoryFilter(8, pageIndex, event.target.value);
        setPageIndex(pageIndex);
        setCategories(results.items)
        setFilter(event.target.value);
        setHasNextPage(false);
        setHasPreviousPage(false);
        setTotalCount(results.length);
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
            const results = await GetCategorySearch(8, 1, searchTerm);
            setPageIndex(1);
            setCategories(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
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
    const handleSortChangeColumn = async (event: React.ChangeEvent<HTMLSelectElement>, type: 'column' & 'order') => {
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
        try {
            console.log('Deleting category with id:', id);
            await DeleteCategory(id);
            const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);

            setPageIndex(pageIndex);
            setCategories(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
            // Optionally, refresh the employee list or update the state
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };
    const handleRestore = async (id: string) => {
        try {
            console.log('Restoring category with id:', id);
            await RestoreCategory(id);
            const results = await GetAllCategory(filter, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setPageIndex(pageIndex);
            setCategories(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.error('Failed to restore category:', error);

        };

    }
    //#endregion
    return (
        <>
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                            <Link to="/categories/createcategory"><button className="btn btn-success w-100">Create</button></Link>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" value={filter} onChange={handleFilterStatusChange}>
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>

                            </select>

                        </div>
                        <div className="col-md-2">
                            <select className="form-control" value={sortColumn} >
                                <option value="">SortColumn</option>
                                <option value="name">A-Z</option>

                            </select>
                        </div>

                        <div className="col-md-2">
                            <select className="form-control" value={sortOrder} onChange={handleSortChange}>
                                <option value="esc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        {/* Component for search */}
                        <div className="col-md-4"><input
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                        /></div>
                        {/* end */}
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="row">
                                {
                                    categories.map((category) => {
                                        return (
                                            <div className="col-md-3" key={category.categoryId}>
                                                <div className="card">

                                                    <img src={category.imageUrl} className="card-img-top" alt={category.categoryName} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{category.categoryName}</h5>
                                                        <p className="card-text">
                                                            <span>
                                                                Trạng thái món: <span className={category.categoryStatus === 'Active' ? 'text-success' : 'text-danger'}>{category.categoryStatus}</span>
                                                            </span>
                                                        </p>
                                                        <div className="container">
                                                            <div className="row">

                                                            </div>
                                                        </div>
                                                        <div className="btn-group m-2">
                                                            <Link to={`/categories/updatecategory/${category.categoryId}`} className="btn btn-primary">Edit</Link>
                                                            <Link to={`/categories/detailcategory/${category.categoryId}`} className="btn btn-info">Detail</Link>
                                                            {category.categoryStatus === 'Active' ? (
                                                                <button className="btn btn-danger" onClick={() => handleDelete(category.categoryId)}>Delete</button>
                                                            ) : (
                                                                <button className="btn btn-warning" onClick={() => handleRestore(category.categoryId)}>Restore</button>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                            <div className="row mt-5">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${!hasPreviousPage && 'disabled'}`}>
                                            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                                        </li>
                                        <li className="page-item disabled">
                                            <span className="page-link">Page {pageIndex}</span>
                                        </li>
                                        <li className={`page-item ${!hasNextPage && 'disabled'}`}>
                                            <button className="page-link" onClick={handleNextPage}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default CategoryPage;