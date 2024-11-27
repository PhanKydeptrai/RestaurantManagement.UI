import { useEffect, useState } from "react";
import { VoucherDto } from "../../../models/voucherDto";
import { GetAllVoucher } from "../../../services/voucher-services";

const VoucherPage = () => {
    const [voucher, setVoucher] = useState<VoucherDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(9); // Setting page size to 9
    const [totalCount, setTotalCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllVoucher(filterStatus, filterType, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setVoucher(result.items);
            setTotalCount(result.items);
        };
        fetchData();
    }, [
        pageIndex,
        pageSize,
        searchTerm,
        sortColumn,
        sortOrder,
        filterStatus,
        filterType,
    ]);

    return (
        <>

        </>
    )
}

export default VoucherPage;