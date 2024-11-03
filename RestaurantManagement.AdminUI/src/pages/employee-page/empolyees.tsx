import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmployeeDto } from "../../models/employeeDto";
import { DeleteEmployee, GetAllEmployee, GetEmp, GetEmpGender, GetEmpRole, GetEmpSearch, GetEmpStatus, RestoreEmployee } from "../../services/employee-service";

const EmployeePage = () => {

    const [employees, setEmployees] = useState<EmployeeDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterGender, setFilterGender] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            console.log(results.items);
            setEmployees(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize]); // Include pageSize in the dependency array
    //#region Pagination
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
    // #region Filter
    //#region filter status
    const handleFilterStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(event.target.value);
        const results = await GetEmpStatus(8, pageIndex, event.target.value);
        setPageIndex(pageIndex);
        setEmployees(results.items);
        setFilterStatus(event.target.value);
        setHasNextPage(false);
        setHasPreviousPage(false);
        setTotalCount(results.length);

    }
    //#endregion
    //#region filter gender
    const handleFilterGenderChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterGender(event.target.value);
        const results = await GetEmpGender(8, pageIndex, event.target.value);
        setPageIndex(pageIndex);
        setEmployees(results.items);
        setFilterGender(event.target.value);
        setHasNextPage(false);
        setHasPreviousPage(false);
        setTotalCount(results.length);
    }
    //#region filter role
    const handleFilterRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterRole(event.target.value);
        const results = await GetEmpRole(8, pageIndex, event.target.value);
        setPageIndex(pageIndex);
        setEmployees(results.items);
        setFilterRole(event.target.value);
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
            const results = await GetEmpSearch(8, pageIndex, searchTerm);
            setPageIndex(pageIndex);
            setEmployees(results.items);
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
            console.log('Deleting empolyee with id: ', id);
            await DeleteEmployee(id);
            const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setPageIndex(pageIndex);
            setEmployees(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.log(error);
        }
    }
    const handleRestore = async (id: string) => {
        try {
            console.log('Restoring employee with id: ', id);
            await RestoreEmployee(id);
            const results = await GetAllEmployee(filterGender, filterRole, filterStatus, searchTerm, sortColumn, sortOrder, pageSize, pageIndex);
            setPageIndex(pageIndex);
            setEmployees(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
        catch (error) {
            console.log(error);
        }
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
                                <li className="breadcrumb-item active" aria-current="page">Employees</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <a href="/createemployee"><button className="btn btn-success w-100">Create</button></a>
                        </div>
                        <div className="col-md-1">
                            <select className="form-control" value={filterStatus} onChange={handleFilterStatusChange}>
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Deleted">Delete</option>

                            </select>

                        </div>

                        <div className="col-md-2">
                            <select className="form-control" value={filterRole} onChange={handleFilterRoleChange}>
                                <option value="">Role</option>
                                <option value="Boss">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Waiter">Waiter</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Chef">Chef</option>
                            </select>
                        </div>
                        <div className="col-md-1">
                            <select className="form-control" value={filterGender} onChange={handleFilterGenderChange}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Orther">Orther</option>
                            </select>
                        </div>

                        {/* Component for search */}
                        <div className="col-md-2"><input
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                        /></div>
                        {/* end */}
                    </div>
                </div>
                <div className="mt-5"></div>
                <table className="table table-bordered table-hover">

                    <thead>
                        <tr className="bg-light">
                            <th scope="col">Họ</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Chức vụ</th>
                            <th scope="col"><span>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee) => {
                                return (
                                    <tr key={employee.userId}>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phoneNumber}</td>
                                        <td>{employee.gender}</td>
                                        <td className={employee.employeeStatus === 'Active' ? 'text-success' : 'text-danger'}>
                                            {employee.employeeStatus}</td>
                                        <td>{employee.role}</td>
                                        <td>
                                            <Link to={`detailemployee/${employee.userId}`} ><button className="btn btn-primary">Detail</button></Link>
                                            {employee.employeeStatus === 'Active' ?
                                                (
                                                    <button className="btn btn-danger" onClick={() => handleDelete(employee.userId)}>Delete</button>
                                                ) : (
                                                    <button className="btn btn-warning" onClick={() => handleRestore(employee.userId)}>Restore</button>
                                                )}
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                    </tbody>
                </table>
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
            </main >
        </>
    )
}

export default EmployeePage;