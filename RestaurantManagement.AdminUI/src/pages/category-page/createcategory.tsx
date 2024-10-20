import { Link } from "react-router-dom";

const CreateCategoryPage = () => {
    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className=" mt-5" width="350px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfC5Rq_CmVhki9yeEHenIHhg_u4ETlR9GwQ&s" alt="" />
                                    <span className=""><button className="btn btn-success mt-3">Chọn ảnh</button></span>
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <div className="row mt-3">
                                        <div className="col-md-9 m-lg-3"><label className="labels">Tên loại món</label>
                                            <input type="text" className="form-control" placeholder="Nhập tên loại món" /></div>
                                    </div>
                                    <div className="row mt-2">
                                        <span className="col-md-3"></span>
                                        <div className="col-md-3"></div>
                                        <span className="col-md-6"><button className="btn btn-success mt-3" type="submit">Lưu thay đổi</button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CreateCategoryPage;


