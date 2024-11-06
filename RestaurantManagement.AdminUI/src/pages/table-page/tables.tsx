import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { DeleteTable, GetAllTables, RestoreTable } from "../../services/table-services";
import { Link } from "react-router-dom";

const TableTypePage = () => {
    const [tables, setTables] = useState<TableDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllTables(pageSize, pageIndex, searchTerm);
            console.log(result.items);
            setTables(result.items);
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
            const results = await GetAllTables(8, 1, searchTerm);
            setPageIndex(1);
            setTables(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
    }
    //#endregion

    const handleDelete = async (id: string) => {
        try {
            console.log("Deleting table with id: " + id);
            await DeleteTable(id);
            const results = await GetAllTables(8, pageIndex, searchTerm);

            setPageIndex(pageIndex);
            setTables(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.log('Failed to delete table:', error);
        }
    };
    const handleRestore = async (id: string) => {
        try {
            console.log("Restoring table with id: " + id);
            await RestoreTable(id);
            const results = await GetAllTables(8, pageIndex, searchTerm);

            setPageIndex(pageIndex);
            setTables(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.log('Failed to restore table:', error);
        }
    };

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Tables</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/createtable" className="btn btn-primary">Create Table</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/createtabletype" className="btn btn-primary">Create TableType</Link>
                        </div>

                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyPress={handleSearchSubmit}
                            />
                        </div>
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
                                                table.activeStatus === 'Occupied' ? 'text-success' :
                                                    table.activeStatus === 'Empty' ? 'text-danger' :
                                                        table.activeStatus === 'Booked' ? 'text-info' : ''
                                            }>
                                                {table.activeStatus}
                                            </td>                                            <td>
                                                {table.tableStatus === 'Active' ? (
                                                    <button className="btn btn-danger" onClick={() => handleDelete(table.tableId)}>Delete</button>
                                                ) : (
                                                    <button className="btn btn-warning" onClick={() => handleRestore(table.tableId)}>Restore</button>
                                                )}
                                                <Link className="btn btn-info" to={`/tableorder/${table.tableId}`}>Detail</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

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
            </main>
        </>
    );
}

export default TableTypePage;