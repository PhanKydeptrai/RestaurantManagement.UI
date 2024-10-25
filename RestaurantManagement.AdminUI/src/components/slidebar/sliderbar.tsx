import { faClipboardList, faFileInvoiceDollar, faHome, faPercent, faSolarPanel, faTags, faUser, faUsers, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SliderBar = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="shadow  bg-body-tertiary rounded">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2">
                                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                                        <div className="position-sticky pt-3">
                                            <ul className="nav flex-column nav-tabs">
                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center " href="/AdminLayout/BossLayout/dashboard.html">
                                                        <FontAwesomeIcon icon={faHome} className="me-2 p-1" />
                                                        Dashboard
                                                    </a>
                                                </li>
                                                <li className="nav-item m-3 shadow-sm ">
                                                    <a className="nav-link d-flex align-items-center" href="/employees">
                                                        <FontAwesomeIcon icon={faUser} className="me-2 p-1" />Employee
                                                    </a>
                                                </li>
                                                <li className="dropdown nav-item m-3  shadow-sm">
                                                    <a className="nav-link d-flex align-items-center dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                        <FontAwesomeIcon icon={faClipboardList} className="me-2 p-1" />
                                                        Order
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="/AdminLayout/BossLayout/listorder.html" className="dropdown-item">Ordering</a></li>
                                                        <li><a href="/AdminLayout/BossLayout/listbook.html" className="dropdown-item">Booking</a></li>
                                                    </ul>
                                                </li>

                                                <li className="nav-item m-3 shadow-sm">
                                                    <Link className="nav-link d-flex align-items-center" to="/categories">
                                                        <FontAwesomeIcon icon={faTags} className="me-2 p-1" />
                                                        Category
                                                    </Link>
                                                </li>

                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center" href="/customers">
                                                        <FontAwesomeIcon icon={faUsers} className="me-2 p-1" />
                                                        Customers
                                                    </a>
                                                </li>
                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center" href="/meals">
                                                        <FontAwesomeIcon icon={faUtensils} className="me-2 p-1" />
                                                        Meals
                                                    </a>
                                                </li>
                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center" href="/AdminLayout/BossLayout/listtable.html">
                                                        <FontAwesomeIcon icon={faSolarPanel} className="me-2 p-1" />
                                                        Table
                                                    </a>
                                                </li>
                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center" href="/AdminLayout/BossLayout/listvoucher.html">
                                                        <FontAwesomeIcon icon={faPercent} className="me-2 p-1" />
                                                        Voucher
                                                    </a>
                                                </li>
                                                <li className="nav-item m-3 shadow-sm">
                                                    <a className="nav-link d-flex align-items-center" href="/AdminLayout/BossLayout/listbill.html">
                                                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2 p-1" />
                                                        Bills
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SliderBar;