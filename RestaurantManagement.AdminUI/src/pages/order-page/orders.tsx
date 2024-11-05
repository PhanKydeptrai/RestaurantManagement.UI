import { useEffect, useState } from "react";
import { OrderDetailDto, OrderDto } from "../../models/orderDto";

const OrderPage = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [orderDetails, setOrderDetails] = useState<OrderDetailDto[]>([]);
    useEffect(() => {

    }, []);

    return (
        <>

        </>
    )
}

export default OrderPage;