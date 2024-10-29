import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetDetailCustomer } from "../../services/customer-services";

const DetailCustomerPage = () => {

    const { userId } = useParams<{ userId: string }>();
    const [customer, setCustomer] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDetailCustomer(userId as string);
                console.log(result);
                setCustomer(result);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [userId]
    );

    return (
        <>
            <form className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/employees">Employees</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row" key={userId}>
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="200" src={customer?.value.userImage || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="" />
                                    <input type="file" ref={customer?.userImage} style={{ display: "none" }} accept="image/*" />
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">First Name</label>
                                            <input type="text" className="form-control" placeholder="Nhập tên" value={customer?.value.firstName} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Last Name</label>
                                            <input type="text" className="form-control" placeholder="Nhập họ" value={customer?.value.lastName} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label className="labels">Email</label>
                                            <input type="text" className="form-control" placeholder="Nhập email" value={customer?.value.email} />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="labels">Phone Number</label>
                                            <input type="text" className="form-control" placeholder="Nhập số điện thoại" value={customer?.value.phoneNumber} />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Gender</label>
                                            <input type="text" className="form-control" value={customer?.value.gender} />

                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Role</label>
                                            <input type="text" className="form-control" value={customer?.value.role} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default DetailCustomerPage;