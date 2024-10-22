import Carousel from "../../components/carousel/carousel";

const Home = () => {
    return (
        <>
            <Carousel />
            <div className="container">
                <div className="tito d-flex justify-content-center m-5"><h2>Món nhiều người ăn nhất</h2></div>
                <div className="owl-carousel">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="item">
                                <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" alt="" className="imgcrs d-block" width="100%" />
                                <div className="item-in4">
                                    <h3>Khô gà lá chanh</h3>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="item">
                                <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" alt="" className="imgcrs d-block" width="100%" />
                                <div className="item-in4">
                                    <h3>Khô gà lá chanh</h3>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="item">
                                <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" alt="" className="imgcrs d-block" width="100%" />
                                <div className="item-in4">
                                    <h3>Khô gà lá chanh</h3>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="item">
                                <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" alt="" className="imgcrs d-block" width="100%" />
                                <div className="item-in4">
                                    <h3>Khô gà lá chanh</h3>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="xemthucdon d-flex justify-content-center align-items-center     ">
                <div className="d-flex justify-content-center align-items-center menu  ">
                    <button className="btn btn-button btn-primary"><h4>Xem thực đơn</h4></button>
                </div>
            </div>
        </>
    )
}
export default Home;