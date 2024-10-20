
const Login = () => {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title text-center">Login</h5>
                                <form>
                                    <div className="mb-2">

                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Nhập email hoặc số điện thoại
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value="email"
                                        />
                                    </div>

                                    <div className="mb-2">

                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value="password"
                                        />
                                    </div>
                                    <a href="#" className="card-link text-success">
                                        Quên mật khẩu?
                                    </a>
                                    <a href="#" className="card-link float-end text-success">
                                        Bạn chưa có tài khoản? Đăng ký tại đây
                                    </a>
                                    <div className="text-center pt-3">
                                        <button type="submit" className="btn btn-success">
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                                <div className="border-top m-3"></div>
                                <div className="text-center mt-2">
                                    <button className="btn btn-primary">
                                        <i className="bi bi-google"></i> Đăng nhập bằng Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}
export default Login;