import { useEffect, useState } from "react";
import { GetAllMeals } from "../../services/meal-services";
import { MealDto } from "../../models/mealDto";
import { Link } from "react-router-dom";

const MealPage = () => {
    const [meals, setMeals] = useState<MealDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllMeals(pageSize, pageIndex, searchTerm);
            console.log(result.items);
            setMeals(result.items);
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

    return (
        <>
            <main className="bg-light py-5">
                <div className="container">
                    <h1 className="text-center mb-4 text-primary">Danh Sách Món Ăn</h1>
                    <div className="row">
                        {/* Cột bộ lọc tìm kiếm */}
                        <div className="col-md-3">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Tìm Kiếm</h5>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm theo tên món ăn"
                                    // onChange={handleSearch}
                                    />
                                    <h6 className="mt-3">Phân loại</h6>
                                    <select className="form-select"
                                    //</div>onChange={handleFilterChange}
                                    >
                                        <option value="">Tất cả</option>
                                        {/* Thêm các phân loại món ăn tại đây */}
                                        <option value="category1">Phân loại 1</option>
                                        <option value="category2">Phân loại 2</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Cột danh sách món ăn */}
                        <div className="col-md-9">
                            <div className="row">
                                {
                                    meals.map((meal) => (
                                        <div className="col-md-4 mb-4" key={meal.categoryId}>
                                            <div className="card shadow-sm border-light" style={{ height: '350px' }}>
                                                <img
                                                    src={meal.imageUrl}
                                                    className="card-img-top"
                                                    alt={meal.mealName}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title text-truncate">{meal.mealName}</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">{meal.categoryName}</h6>
                                                    <h3 className="text-success mt-auto">{meal.price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="row mt-5">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${!hasPreviousPage ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handlePreviousPage}>Trang Trước</button>
                                        </li>
                                        <li className="page-item disabled">
                                            <span className="page-link">Trang {pageIndex}</span>
                                        </li>
                                        <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handleNextPage}>Trang Sau</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>
    )
}
export default MealPage;