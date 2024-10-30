import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { CustomerDto } from "../../models/customerDto";
import { Customer, GetAllCustomers } from "../../services/customer-services";

const CustomerPage = () => {

    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllCustomers(pageSize, pageIndex, searchTerm);
            console.log(result.items);
            setCustomers(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize]); // Include pageSize in the dependency array

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

    //#region Search
    //truyền tham số cho searchTerm
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    //Thực hiện search
    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetAllCustomers(8, 1, searchTerm);
            setPageIndex(1);
            setCustomers(results.items);
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
                                <li className="breadcrumb-item active" aria-current="page">Customers</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <a href="/createemployee"><button className="btn btn-success w-100">Create</button></a>
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
                    <div className="mt-5"></div>

                    <div className="col-md-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Họ</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Loại khách hàng</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer) => {
                                        return (
                                            <tr key={customer.userId}>
                                                <td>{customer.lastName}</td>
                                                <td>{customer.firstName}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phoneNumber}</td>
                                                <td>{customer.gender}</td>
                                                <td className={customer.customerStatus === 'Active' ? 'text-success' : 'text-danger'}>
                                                    {customer.customerStatus}</td>
                                                <td>{customer.customerType}</td>
                                                <td>
                                                    <Link to={`detailcustomer/${customer.userId}`}><button className="btn btn-primary">Detail</button></Link>
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
                    </div>
                </div>
            </main>
        </>
    )
}

export default CustomerPage;