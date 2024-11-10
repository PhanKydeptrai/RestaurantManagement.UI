import { useEffect, useState } from "react";
import { MealDto } from "../../models/mealDto";
import { DeleteMeal, GetAllMeal, GetAllMeals, GetMeal, RestoresMeal } from "../../services/meal-services";
import { Link } from "react-router-dom";

const MealPage = () => {
    const [meals, setMeals] = useState<MealDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSellStatus, setFilterSellStatus] = useState('');
    const [filterMealStatus, setFilterMealStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

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

    //#region Filter
    const handleFilterSellStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const results = await GetAllMeal(filterCategory, event.target.value, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
        setMeals(results.value.items);
        setFilterCategory(filterCategory);
        setFilterSellStatus(event.target.value);
        setFilterMealStatus(filterMealStatus);
        setSearchTerm(searchTerm);
        setSortColumn(sortColumn);
        setSortOrder(sortOrder);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    }

    const handleFilterMealStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const results = await GetAllMeal(filterCategory, filterSellStatus, event.target.value, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
        setMeals(results.value.items);
        setFilterCategory(filterCategory);
        setFilterSellStatus(filterSellStatus);
        setFilterMealStatus(event.target.value);
        setSearchTerm(searchTerm);
        setSortColumn(sortColumn);
        setSortOrder(sortOrder);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
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
            const results = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setPageIndex(1);
            setMeals(results.items);
            setFilterCategory(filterCategory);
            setFilterSellStatus(filterSellStatus);
            setFilterMealStatus(filterMealStatus);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
    }
    //#endregion
    //#region Delete and Restore
    const handleDelete = async (id: string) => {
        try {
            console.log('Deleting category with id:', id);
            await DeleteMeal(id);
            const results = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setFilterCategory(filterCategory);
            setFilterSellStatus(filterSellStatus);
            setFilterMealStatus(filterMealStatus);
            setSearchTerm(searchTerm);
            setSortColumn(sortColumn);
            setSortOrder(sortOrder);
            setPageIndex(pageIndex);
            setMeals(results.value.items);
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
            await RestoresMeal(id);
            const results = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setFilterCategory(filterCategory);
            setFilterSellStatus(filterSellStatus);
            setFilterMealStatus(filterMealStatus);
            setSearchTerm(searchTerm);
            setSortColumn(sortColumn);
            setSortOrder(sortOrder);
            setPageIndex(pageIndex);
            setMeals(results.value.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
            // Optionally, refresh the employee list or update the state
        } catch (error) {
            console.error('Failed to restore category:', error);
        }
    };
    //#endregion
    return (
        <>
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Meals</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/createmeal"><button className="btn btn-success w-100">Create</button></Link>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleFilterSellStatus}>
                                <option value="">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleFilterMealStatus}>
                                <option value="">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        {/* Component for search */}
                        <div className="col-md-3"><input
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
                                    meals.map((meal) => {
                                        return (
                                            <div className="col-md-3" key={meal.categoryId}>
                                                <div className="card">
                                                    <img src={meal.imageUrl} className="card-img-top" alt={meal.mealName} />
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-7"><h5 className="card-title">{meal.mealName}</h5>
                                                                <h6 className="card-subtitle mb-2 text-muted">{meal.categoryName}</h6>
                                                            </div>
                                                            <div className="col-md-5"><h3 className="card-subtitle mb-2 text-muted">{meal.price}</h3></div>
                                                        </div>




                                                        <p className="card-text">
                                                            <span>
                                                                Trạng thái món: <span className={meal.mealStatus === 'Active' ? 'text-success' : 'text-danger'}>{meal.mealStatus}</span>
                                                            </span>
                                                        </p>
                                                        <div className="btn-group">
                                                            <Link to={`updatemeal/${meal.mealId}`} className="btn btn-primary">Edit</Link>
                                                            <Link to={`detailmeal/${meal.mealId}`} className="btn btn-info">Detail</Link>

                                                            {meal.mealStatus === 'Active' ? (
                                                                <button className="btn btn-danger" onClick={() => handleDelete(meal.mealId)}>Delete</button>
                                                            ) : (
                                                                <button className="btn btn-warning" onClick={() => handleRestore(meal.mealId)}>Restore</button>
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
    )
}

export default MealPage