import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear(); // Xóa tất cả dữ liệu trong sessionStorage
        navigate('/'); // Điều hướng đến trang đăng nhập sau khi logout
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="btn btn-primary d-md-none d-block float-end" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-expanded="false" aria-controls="sidebarMenu">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button>
                    <a className="navbar-brand" href="#">Nhum Nhum Restaurant</a>
                    <div className="collapse navbar-collapse" id="navbarNav"></div>
                    {/* <a href="">
                        <span><FontAwesomeIcon icon={faBell} size="lg" /></span>
                        <span className="badge rounded-pill badge-notification bg-danger">999+</span>
                    </a> */}
                    <div className="ms-auto dropdown">
                        <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="avatar" className="rounded-circle" width="40" height="40" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                            {/* <li><a className="dropdown-item" href="/AdminLayout/BossLayout/profile.html">Profile</a></li> */}
                            <li><a className="dropdown-item" href="/account">Profile</a></li>
                            <li><a className="dropdown-item" href="/log">History</a></li>
                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Header;