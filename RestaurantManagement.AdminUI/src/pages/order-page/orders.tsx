import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { GetAllForOrder } from "../../services/table-services";
import { Link } from "react-router-dom";

const OrderPage = () => {
    const [tables, setTables] = useState<TableDto[]>([]);

    const [filterTableType, setFilterTableType] = useState('');
    const [filterActiveStatus, setFilterActiveStatus] = useState("Occupied");
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllForOrder(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, pageIndex, pageSize);
            console.log(result.items);
            setTables(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize]); // Include pageSize in the dependency array

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                    <h2>Order</h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Table Id</th>
                                                <th scope="col">Table Name</th>
                                                <th scope="col">Table Type</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tables.map((table) => (
                                                <tr key={table.tableId}>
                                                    <td>{table.tableId}</td>
                                                    <td>{table.tableTypeName}</td>
                                                    <td>{table.activeStatus}</td>
                                                    <td>{table.tableStatus}</td>
                                                    <td>
                                                        <Link to={`/order/${table.tableId}`} className="btn btn-primary">Order</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default OrderPage;