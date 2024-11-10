import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { AssignTableforCustomer, GetAllTableOfStatusEmpty, UnAssignTableforCustomer } from "../../services/table-services";
import { Link } from "react-router-dom";

const AssignCustomerPage = () => {
    const [tables, setTable] = useState<TableDto[]>([]);
    const [filterTableType, setFilterTableType] = useState('');
    const [filterActiveStatus, setFilterActiveStatus] = useState('Empty');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, page, pageSize);
            setTable(response.value.items);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
            setTotalCount(response.totalCount);
            console.log(response.value.items);
        };
        fetchData();
    }, [page, pageSize]);

    const handleFilterStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {


        const newFilterStatus = event.target.value;
        console.log(newFilterStatus);

        // setFilterActiveStatus(newFilterStatus);


        // console.log(activeStatus);
        setFilterActiveStatus(newFilterStatus);

        const response = await GetAllTableOfStatusEmpty(filterTableType, newFilterStatus, filterStatus, sortColumn, sortOrder, 1, 8);
        console.log(response.value.items);
        setTable(response.value.items);
        setHasNextPage(response.hasNextPage);
        setHasPreviousPage(response.hasPreviousPage);
        setTotalCount(response.totalCount);
    };

    const handleAssign = async (tableId: string) => {
        try {
            console.log("Assigning table with id: ", tableId);
            await AssignTableforCustomer(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setPage(page);
            console.log(response.value.items);
            setTable(response.value.items);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
            setTotalCount(response.totalCount);

        }
        catch (error) {
            console.error("Error assigning table:", error);
        }
    }
    const handleUnAssign = async (tableId: string) => {
        try {
            console.log("Unassigning table with id: ", tableId);
            await UnAssignTableforCustomer(tableId);
            const response = await GetAllTableOfStatusEmpty(filterTableType, filterActiveStatus, filterStatus, sortColumn, sortOrder, 1, 8);
            setPage(page);
            console.log(response.value.items);
            setTable(response.value.items);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
            setTotalCount(response.totalCount);

        }
        catch (error) {
            console.error("Error unassigning table:", error);
        }
    }



    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/tables">Tables</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Table Assign</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div>
                    <div className="col">
                        {/* Add a select element to change the filter status */}
                        <select onChange={handleFilterStatusChange} value={filterActiveStatus}>
                            <option value="Empty">Empty</option>
                            <option value="Occupied">Occupied</option>
                        </select>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Table Id</th>
                                        <th scope="col">TableType Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">ActiveStatus</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tables.map((table) => (
                                        <tr key={table.tableId}>
                                            <td>{table.tableId}</td>
                                            <td>{table.tableTypeName}</td>
                                            <td className={table.tableStatus === 'empty' ? 'text-danger' : 'text-success'}>{table.tableStatus}</td>
                                            <td className={
                                                table.activeStatus === 'Empty' ? 'text-danger' : 'text-success'
                                            }>
                                                {table.activeStatus}
                                            </td>
                                            <td>
                                                {table.activeStatus === 'Empty' ? (
                                                    <button className="btn btn-info" onClick={() => handleAssign(table.tableId)}>Assign</button>
                                                ) : (
                                                    <button className="btn btn-warning" onClick={() => handleUnAssign(table.tableId)}>UnAssign</button>

                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AssignCustomerPage