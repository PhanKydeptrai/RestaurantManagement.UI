import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { CategoryInfo } from "./createmeal";
import axios from "axios";
import { UpdateMeal } from "../../services/meal-services";
import { toast, ToastContainer } from "react-toastify";

const UpdateMealPage = () => {

    const { mealId } = useParams<{ mealId: string }>();
    const [mealName, setMealName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileInputRef, setfileInputRef] = useState<HTMLInputElement | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ mealName?: string, price?: string, description?: string, categoryId?: string }>();


    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/meal/${mealId}`);
                const data = await response.json();
                console.log(data);
                setMealName(data.value.mealName);
                setPrice(data.value.price);
                setDescription(data.value.description);
                setImageUrl(data.value.imageUrl);
                setCategoryId(data.value.categoryId);
                console.log(mealName);
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        }; fetchMealData();
    }, [mealId]);

    useEffect(() => {
        fetch('https://localhost:7057/api/category/category-info')
            .then(response => response.json())
            .then(data => setCategoryInfo(data.value))
            .catch(error => console.log(error))
    }, []);

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
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formData = new FormData();

        formData.append('mealName', mealName);
        formData.append('price', price?.toString() as string);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);
        if (fileInputRef && fileInputRef.files) {
            formData.append('mealImage', fileInputRef.files[0]);
        }
        try {
            if (mealId) {
                const response = await UpdateMeal(formData, mealId);
                console.log('Meal update Successfully', response);
                if (response.isSuccess) {
                    console.log('Successfully');
                    notifySucess();
                } else {
                    console.log('Failed');
                    notifyError();
                }
            }
        } catch (error) {
            console.error('Failed to update meal:', error);
        }
    }
    const validateForm = () => {
        const newErrors: { mealName?: string, price?: string, description?: string, categoryId?: string } = {
            mealName: mealName ? '' : 'Tên món không được để trống',
            price: price ? '' : 'Giá không được để trống',
            description: description ? '' : 'Mô tả không được để trống',
            categoryId: categoryId ? '' : 'Loại món không được để trống'
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


    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/meals">Meals</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Update</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="mealName" className="form-label">Meal Name</label>
                        <input type="text" className="form-control" id="mealName" value={mealName} onChange={(event) => setMealName(event.target.value)} />
                        {errors?.mealName && <div className="text-danger">{errors.mealName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
                        {errors?.price && <div className="text-danger">{errors.price}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                        {errors?.description && <div className="text-danger">{errors.description}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" id="category" value={categoryId} onChange={(event) => {
                            const selectedCategory = categoryInfo.find(category => category.categoryId === event.target.value);
                            setCategoryId(event.target.value);
                            setCategoryName(selectedCategory ? selectedCategory.categoryName : '');
                        }}>
                            {categoryInfo.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                        {errors?.categoryId && <div className="text-danger">{errors.categoryId}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image</label>
                        <input type="file" className="form-control" id="imageUrl" ref={setfileInputRef} onChange={handleFileChange} />
                        <img src={imageUrl ?? undefined} alt="Meal" className="img-fluid mt-2" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </main>
            <ToastContainer />

        </>
    )
}

export default UpdateMealPage;