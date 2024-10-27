import { useEffect, useState } from "react";
import { TableDto } from "../../models/tableDto";
import { DeleteTable, GetAllTable } from "../../services/table-services";
import { Link } from "react-router-dom";

const TablePage = () => {
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
            const result = await GetAllTable(pageSize, pageIndex, searchTerm);
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
            const results = await GetAllTable(8, 1, searchTerm);
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
            const results = await GetAllTable(8, pageIndex, searchTerm);

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
    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Tables</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/table/create" className="btn btn-primary">Create</Link>
                        </div>
                        <div className="col-md-6"></div>
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
                                        <th scope="col">Table Type</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tables.map((table) => (
                                        <tr key={table.tableId}>
                                            <td>{table.tableTypeId}</td>
                                            <td>{table.quantity}</td>
                                            <td>
                                                <Link to={`/table/edit/${table.tableId}`} className="btn btn-primary">Edit</Link>
                                                <button className="btn btn-danger" onClick={() => handleDelete(table.tableId)}>Delete</button>
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
    );
}

export default TablePage;