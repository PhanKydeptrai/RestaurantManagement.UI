import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetDetailCategory } from "../../services/category-service";

const DetailCategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [category, setCategory] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDetailCategory(categoryId as string);
                console.log(result);
                setCategory(result);
            } catch (e) {
                console.log(e);
            }
        }; fetchData();
    }, [categoryId]);

    return (
        <>
            <form className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row" key={categoryId}>
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="200" src={category?.value.imageUrl || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="" />
                                    <input type="file" ref={category?.imageUrl} style={{ display: "none" }} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Category Name</label>
                                    <input type="text" className="form-control" value={category?.value.categoryName} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Category Description</label>
                                    <input typeof="text" className="form-control" value={category?.value.categoryStatus} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Category Description</label>
                                    <textarea typeof="text" className="form-control" value={category?.value.description} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default DetailCategoryPage;