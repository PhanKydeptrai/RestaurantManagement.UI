import { useEffect, useState } from "react";
import { CategoryDto } from "../../models/categoryDto";
import { GetAllCategory } from "../../services/category-services";
import { Link } from "react-router-dom";

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(4); // Setting page size to 8
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
    }, [pageIndex, pageSize]);


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

    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán chỉ số của danh mục cần hiển thị


    return (
        <main className="bg-light py-5">
            <div className="container">
                <h1 className="text-center mb-4 text-primary">Danh Mục</h1>
                <div className="row">
                    {
                        categories.map((category) => (
                            <div className="col-md-3 mb-4" key={category.categoryId}>
                                <div className="card shadow-sm border-light" style={{ height: '200px' }}>
                                    <img
                                        src={category.imageUrl}
                                        className="card-img-top"
                                        alt={category.categoryName}
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-truncate">{category.categoryName}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="row">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
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
        </main>
    );
}

export default CategoryPage;