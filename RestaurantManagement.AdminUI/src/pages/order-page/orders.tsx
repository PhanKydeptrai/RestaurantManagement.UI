import { Link } from "react-router-dom";
import { OrderDto } from "../../models/orderDto";
import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/order-services";

const OrderPage = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();

    const [filterUserId, setFilterUserId] = useState("");
    const [filterTableId, setFilterTableId] = useState("");
    const [filterPaymentStatus, setFilterPaymentStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching orders...");
            const results = await GetAllOrders(filterUserId, filterTableId, filterPaymentStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            console.log(results.value);
            setOrders(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.hasPreviousPage);
            setTotalCount(results.totalCount);
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

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Order</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="col-md-2">
                        <Link to="/order/create"><button className="btn btn-success w-100">Create</button></Link>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Order Id</th>
                                                <th scope="col">Table Id</th>
                                                <th scope="col">Payment Status</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => {
                                                return (
                                                    <tr key={order.orderId}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.tableId}</td>
                                                        <td>{order.paymentStatus}</td>
                                                        <td>{order.total}</td>
                                                        <td>
                                                            <Link to="" className="btn btn-success">Update</Link>
                                                            <Link to={`/orders/${order.tableId}`} className="btn btn-primary">View</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
            </main>
        </>
    )
}

export default OrderPage;