import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CreateMeal } from "../../services/meal-services";
import { toast } from "react-toastify";

export interface CategoryInfo {
    categoryId: string;
    categoryName: string;
}

const CreateMealPage = () => {

    const [mealname, setMealName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ mealName?: string, price?: string, description?: string, categoryId?: string, categoryName?: string }>();


    const [categoryinfo, setCategoryInfo] = useState<CategoryInfo[]>([]);
    useEffect(() => {
        fetch('https://localhost:7057/api/category/category-info')
            .then(response => response.json())
            .then(data => setCategoryInfo(data.value))
            .catch(error => console.log(error))
    })
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = categoryinfo.find(category => category.categoryId === event.target.value);
        setCategoryId(event.target.value);
        setCategoryName(selectedCategory ? selectedCategory.categoryName : '');
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const validateForm = () => {
        const newErrors: { mealName?: string, price?: string, description?: string, categoryId?: string, categoryName?: string } = {
            mealName: mealname ? '' : 'Tên món không được để trống',
            price: price ? '' : 'Giá không được để trống',
            // description: description ? '' : 'Mô tả không được để trống',
            categoryId: categoryId ? '' : 'Loại món không được để trống',
            categoryName: categoryName ? '' : 'Loại món không được để trống'
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const notifySucess = () => {
        toast.success('Thành công!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    const notifyError = () => {
        toast.error('Vui lòng kiểm tra lại!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // if (!validateForm()) {
        //     return;
        // }
        const formData = new FormData();
        formData.append('mealname', mealname);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);

        console.log(categoryId)
        console.log(categoryName)
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('imageUrl', fileInputRef.current.files[0]);
        }
        const response = await CreateMeal(formData);
        console.log(response);

        // // show toast 
        // if (response.isSuccess) {
        //     notifySucess();
        //     setTimeout(() => {
        //         navigate('/meals');
        //     }, 2000);

        // }
        // else {
        //     notifyError();
        // }
    }
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <main className="container">
                    <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <div className="col ">
                            <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                                <ol className="breadcrumb mb-0 ">
                                    <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                    <li className="breadcrumb-item"><Link to="/meals">Meals</Link></li>
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
                                        <img className=" mt-5" width="350px" src={imageUrl || 'https://via.placeholder.com/350'} alt="" />
                                        <button type="button" className="btn btn-success mt-3" onClick={handleFileSelect}>
                                            Chọn ảnh
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-9 border-right">
                                    <div className="p-3 py-5">
                                        <div className="row mt-3">
                                            <div className="col-md-9 m-lg-3">
                                                <label className="labels">Tên món</label>
                                                <input type="text" className="form-control" placeholder="Nhập tên món" value={mealname} onChange={(e) => setMealName(e.target.value)} />
                                                {errors?.mealName && <div className="text-danger">{errors.mealName}</div>}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-9 m-lg-3">
                                                <label className="labels">Giá</label>
                                                <input type="text" className="form-control" placeholder="Nhập giá" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                {errors?.price && <div className="text-danger">{errors.price}</div>}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-9 m-lg-3">
                                                <label className="labels">Mô tả</label>
                                                <textarea typeof="text" className="form-control" placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                {errors?.description && <div className="text-danger">{errors.description}</div>}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-9 m-lg-3">
                                                <label className="labels">Tên loại món</label>
                                                <select id="categorySelect" className="form-control" value={categoryId} onChange={handleCategoryChange}>
                                                    <option value="">Select Category</option>
                                                    {Array.isArray(categoryinfo) && categoryinfo.map((category: CategoryInfo) => (
                                                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                                    ))}

                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3">Create Meal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </form>
        </>
    )
}

export default CreateMealPage