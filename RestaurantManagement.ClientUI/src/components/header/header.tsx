

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
                                <a className="nav-link " href="/">Trang chủ </a>
                            </li>
                            {/* <li >
                                <a className="nav-link" href="#">Tìm kiếm thông tin đặt bàn</a>
                            </li> */}

                            <li >
                                <a className="nav-link" href="/category">Thực đơn</a>
                            </li>
                            <li >
                                <a className="nav-link" href="/order">Đặt món</a>
                            </li>
                            <li className="border-link">
                                <a className="nav-link" href="/book">Đặt bàn</a>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <button data-mdb-ripple-init type="button" className="btn btn-primary px-3 me-2">
                                Login
                            </button>
                            <button data-mdb-ripple-init type="button" className="btn btn-primary me-3">
                                Sign up for free
                            </button>

                        </div>
                    </div>
                </div>
            </nav >
        </>
    )

}

export default Header;  