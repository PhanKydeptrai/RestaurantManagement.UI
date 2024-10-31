import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VoucherDto } from "../../models/voucherDto";
import { DeleteVoucher, GetAllVouchers } from "../../services/voucher-services";

const VoucherPage = () => {

    const [vouchers, setVouchers] = useState<VoucherDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const result = await GetAllVouchers(pageSize, pageIndex, searchTerm);
            console.log(result.items);
            setVouchers(result.items);
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
            const results = await GetAllVouchers(8, 1, searchTerm);
            setPageIndex(1);
            setVouchers(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        };
    }
    //#endregion

    const handleDelete = async (id: string) => {
        try {
            console.log("Deleting voucher with id: " + id);
            await DeleteVoucher(id);
            const results = await GetAllVouchers(8, pageIndex, searchTerm);
            setPageIndex(pageIndex);
            setVouchers(results.items);
            setSearchTerm(searchTerm);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Vouchers</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-2">
                            <Link to="/createvoucher" className="btn btn-primary">Create Voucher</Link>
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
                                        <th scope="col">Voucher Name</th>
                                        <th scope="col">Max Discount</th>
                                        <th scope="col">Voucher Condition</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">Expired Date</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.map((voucher) => {
                                        return (
                                            <tr key={voucher.voucherId}>
                                                <td>{voucher.voucherName}</td>
                                                <td>{voucher.maxDiscount}</td>
                                                <td>{voucher.voucherCondition}</td>
                                                <td>{voucher.startDate}</td>
                                                <td>{voucher.expiredDate}</td>
                                                <td>{voucher.description}</td>
                                                <td className={voucher.status === 'Active' ? 'text-success' : 'text-danger'}>{voucher.status}</td>

                                                <td>

                                                    <button className="btn btn-danger" onClick={() => handleDelete(voucher.voucherId)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
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
    )
}

export default VoucherPage;