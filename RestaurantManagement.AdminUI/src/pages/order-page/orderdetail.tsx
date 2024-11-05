import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetOrderDetail } from "../../services/order-services";

const OrderDetailPage = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const [table, setTable] = useState<any>();
    const [orderDetail, setOrderDetail] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetOrderDetail(tableId as string);
                console.log(result);
                setTable(result);
            } catch (e) {
                console.log(e);
            }
        }; fetchData();
    }, [tableId]);
    useEffect(() => { { } })

    return (
        <>
            <main>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/tables">Table</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Order Table</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <h2>Order Table</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Order Id</label>
                            <input type="text" className="form-control" value={table?.value.orderId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Table Id</label>
                            <input type="text" className="form-control" value={table?.value.tableId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Status</label>
                            <input type="text" className="form-control" value={table?.value.paymentStatus} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Total</label>
                            <input type="text" className="form-control" value={table?.value.total} readOnly />
                        </div>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">OrderId</th>
                                    <th scope="col">Meal Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table?.value.orderDetails.map((item: any) => (
                                    <tr key={item.OrderId}>
                                        <td>{item.orderDetailId}</td>
                                        <td>{item.mealName}</td>
                                        <td><img src={item.image} alt={item.mealName} width="100" height="100" /></td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unitPrice}</td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </main>
        </>
    )
}

export default OrderDetailPage;

