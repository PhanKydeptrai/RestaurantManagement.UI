import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeDto } from "../../models/employeeDto";
import { Link } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<EmployeeDto | null>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('https://localhost:7057/api/account/account-emp-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'
                    }
                });

                if (response.data?.value) {
                    setAccount(response.data.value);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }; fetchData();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Xóa tất cả dữ liệu trong sessionStorage
        navigate('/'); // Điều hướng đến trang đăng nhập sau khi logout
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <button className="btn btn-primary d-md-none d-block float-end" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-expanded="false" aria-controls="sidebarMenu">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button> */}
                    <a className="navbar-brand" href="#">Nhum Nhum Restaurant</a>
                    <div className="collapse navbar-collapse" id="navbarNav"></div>
                    {/* <a href="">
                        <span><FontAwesomeIcon icon={faBell} size="lg" /></span>
                        <span className="badge rounded-pill badge-notification bg-danger">999+</span>
                    </a> */}
                    <div className="ms-auto dropdown">
                        <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={account?.userImage || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="employee" className="rounded-circle" width="40" height="40" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                            {/* <li><a className="dropdown-item" href="/AdminLayout/BossLayout/profile.html">Profile</a></li> */}
                            <li><Link to="/account" className="dropdown-item">Profile</Link></li>
                            <li><Link to="/log" className="dropdown-item">History</Link></li>
                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Header;