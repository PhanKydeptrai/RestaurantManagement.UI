import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetDetailMeal } from "../../services/meal-services";

const DetailMealPage = () => {

    const { mealId } = useParams<{ mealId: string }>();
    const [meal, setMeal] = useState<any>();
    useEffect(() => {
        const fecthData = async () => {
            try {
                const result = await GetDetailMeal(mealId as string);
                console.log(result);
                setMeal(result);
            } catch (e) {
                console.log(e);
            }
        }; fecthData();
    }, [mealId]);
    return (
        <>
            <form className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/meals">Meals</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row" key={mealId}>
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="200" src={meal?.value.imageUrl || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="" />
                                    <input type="file" ref={meal?.imageUrl} style={{ display: "none" }} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Meal Name</label>
                                    <input type="text" className="form-control" value={meal?.value.mealName} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Price</label>
                                    <input typeof="text" className="form-control" value={meal?.value.price} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Description</label>
                                    <textarea typeof="text" className="form-control" value={meal?.value.description} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DetailMealPage;