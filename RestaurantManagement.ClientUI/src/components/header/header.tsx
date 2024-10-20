

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" >
        <div className="container ">
            <a className="navbar-brand brand" href="#"><img id="logo" src="/trangchu/hinhanh/caiban_preview_rev_1.png" alt="" />Gốc cây</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav ms-auto">
                    <li >
                        <a className="nav-link " href="/RestaurantManagement.UI/trangchu/trangchu.html">Trang chủ </a>
                    </li>
                    <li >
                        <a className="nav-link" href="#">Tìm kiếm thông tin đặt bàn</a>
                    </li>
                    
                    <li >
                        <a className="nav-link" href="/RestaurantManagement.UI/trangmonan/monan.html">Thực đơn</a>
                    </li>
                    <li className="border-link">
                        <a className="nav-link" href="#">Đặt bàn</a>
                    </li>
                </ul>
                <div className="dropdown">
                            <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="avatar" className="rounded-circle" width="40" height="40" />
                            </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                            <li><a className="dropdown-item" href="/AdminLayout/BossLayout/profile.html">Profile</a></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
            </div>
        </div>
    </nav>
        </>
    )

}

export default Header;  