import { text } from "@fortawesome/fontawesome-svg-core"
import { faGit } from "@fortawesome/free-brands-svg-icons"
import { faCoins, faGift, faGlassMartiniAlt, faHeart, faPlus, faRecycle, faSearch, faTimes, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Order = () => {

    return (
        <>
            <div className="container mt-5">
                <div className="container-fluid">
                    <h2>Đặt món</h2>
                    <div className="row">
                        <div className="col-md-8">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <FontAwesomeIcon icon={faHeart} />
                                        Best Seller
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <FontAwesomeIcon icon={faUtensils} />
                                        Món ăn
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <FontAwesomeIcon icon={faGlassMartiniAlt} />
                                        <i className="fas fa-glass-martini-alt">
                                        </i>
                                        Đồ uống
                                    </a>
                                </li>

                            </ul>
                            <div className="m-2">
                                <div className="input-group search-bar">
                                    <input className="form-control" placeholder="Tên món cần tìm..." type="text" />
                                    <button className="btn btn-outline-secondary" type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i className="fas fa-heart">
                                        </i>
                                        Hay dùng
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua lột chiên giòn" height="100" src="https://storage.googleapis.com/a1aa/image/CMAsTyPPINoEPhusHIzyefQl6uGB90ppkI1GfeSMiEMRV2ecC.jpg" width="100" />
                                    <p>
                                        Cua lột chiên giòn
                                    </p>
                                </div>
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua rang me" height="100" src="https://storage.googleapis.com/a1aa/image/e5TQzHTRoHXEJKhuMZq7E73pa2ttGsTI1EmJ3Plzoa2ky2zJA.jpg" width="100" />
                                    <p>
                                        Cua rang me
                                    </p>
                                </div>
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua gạch nướng than" height="100" src="https://storage.googleapis.com/a1aa/image/ST3BWy9ZnW4dBRDPhVc3TOOh7yPftjjk7jWAUfXFjZUOltnTA.jpg" width="100" />
                                    <p>
                                        Cua gạch nướng than
                                    </p>
                                </div>
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua lột rang muối hương càng" height="100" src="https://storage.googleapis.com/a1aa/image/rZejnCMpYJ1cZabax7g6BE9wzXOtO00zbyHVg8J7l29ny2zJA.jpg" width="100" />
                                    <p>
                                        Cua lột rang muối hương càng
                                    </p>
                                </div>
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua cốm nướng than" height="100" src="https://storage.googleapis.com/a1aa/image/MeY80r7CWbWtJqEObKkhVaCYCFWvPz3rr9Jc8T4ki8bpy2zJA.jpg" width="100" />
                                    <p>
                                        Cua cốm nướng than
                                    </p>
                                </div>
                                <div className="col-md-2 menu-item">
                                    <img alt="Cua cốm nướng than" height="100" src="https://storage.googleapis.com/a1aa/image/MeY80r7CWbWtJqEObKkhVaCYCFWvPz3rr9Jc8T4ki8bpy2zJA.jpg" width="100" />
                                    <p>
                                        Cua cốm nướng than
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="order-summary">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">
                                        Bàn:
                                    </h5>
                                    <input className="form-control" placeholder="Chọn bàn..." style={{ width: "60%" }} type="text" />
                                    <button className="btn btn-outline-secondary" type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                    <button className="btn btn-outline-secondary" type="button">
                                        <FontAwesomeIcon icon={faUser} />

                                    </button>
                                    <button className="btn btn-outline-secondary" type="button">
                                        <FontAwesomeIcon icon={faRecycle} />
                                    </button>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                Tên món
                                            </th>
                                            <th>
                                                SL
                                            </th>
                                            <th>
                                                Đơn gía
                                            </th>
                                            <th>
                                                Thành tiền
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Cua gạch (Kg)
                                            </td>
                                            <td>
                                                1,50
                                            </td>
                                            <td>
                                                600.000/kg
                                            </td>
                                            <td>
                                                900.000
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTimes} />

                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                + Cua gạch nướng than (Đĩa)
                                            </td>
                                            <td>
                                                2,00
                                            </td>
                                            <td>
                                                150.000
                                            </td>
                                            <td>
                                                300.000
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTimes} />

                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                + Cua gạch hấp bia (Đĩa)
                                            </td>
                                            <td>
                                                1,00
                                            </td>
                                            <td>
                                                125.000
                                            </td>
                                            <td>
                                                125.000
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTimes} />

                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-outline-primary">
                                        <FontAwesomeIcon icon={faPlus} />

                                        Thêm món khác
                                    </button>
                                    <button className="btn btn-outline-secondary">
                                        <FontAwesomeIcon icon={faGift} />

                                    </button>
                                    <button className="btn btn-outline-secondary">
                                        <FontAwesomeIcon icon={faCoins} />
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <select className="form-select" style={{ width: "40%" }}>
                                        <option selected={true}>
                                            Nhân viên phục vụ
                                        </option>
                                        <option>Thái</option>
                                        <option>Kỷ</option>
                                        <option>Tuấn</option>
                                        <option>Tú</option>
                                    </select>
                                    <span className="total">
                                        Tổng tiền: 1.325.000
                                    </span>
                                </div>
                                <div className="btn-group mt-2">
                                    <button className="btn btn-primary">
                                        <i className="fas fa-paper-plane">
                                        </i>
                                        Gửi bếp/bar
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-times">
                                        </i>
                                        Hủy bỏ
                                    </button>
                                    <button className="btn btn-success">
                                        <i className="fas fa-cut">
                                        </i>
                                        Cắt &amp; Thêm
                                    </button>
                                    <button className="btn btn-warning">
                                        <i className="fas fa-calculator">
                                        </i>
                                        Tính tiền
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}