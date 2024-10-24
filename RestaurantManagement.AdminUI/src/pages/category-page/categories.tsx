import { json, Link } from "react-router-dom";
import { CategoryDto } from "../../models/categoryDto";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../../services/category-service";


const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllCategories(pageSize, pageIndex, searchTerm);
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

    //#region Search
    //truyền tham số cho searchTerm
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    //Thực hiện search
    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetAllCategories(8, 1, searchTerm);
            setPageIndex(1);
            setCategories(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
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
                        <div className="col-md-6"></div>
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
                                                                Trạng thái món: <span className={category.categoryStatus === 'kd' ? 'text-success' : 'text-danger'}>{category.categoryStatus === 'kd' ? 'Active' : 'Inactive'}</span>
                                                            </span>
                                                        </p>
                                                        <div className="row">
                                                            <Link to={`/categories/updatecategory/${category.categoryId}`} className="btn btn-primary">Edit</Link>
                                                            <a href="" className="btn btn-danger">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                            <div className="row mt-5"><nav aria-label="Page navigation example">
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