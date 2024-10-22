const Carousel = () => {
    return (
        <>
            <div className="p-5 text-center bg-image"
                style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')", height: '400px' }} >
                <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '250px' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Món ngon từ gốc</h1>
                            <h4 className="mb-3">Vị ngon đến ngọn</h4>
                            <a data-mdb-ripple-init className="btn btn-outline-light btn-lg" href="#!" role="button">Đến với chúng tôi</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;