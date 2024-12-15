import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoryInfo } from "./createmeal";
import axios from "axios";
import { GetDetailMeal, UpdateMeal } from "../../services/meal-services";
import { toast, ToastContainer } from "react-toastify";
import { Breadcrumb, Button, Col, Row } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { MealDto } from "../../models/mealDto";

const UpdateMealPage = () => {

    const { mealId } = useParams<{ mealId: string }>();
    const [meal, setMeal] = useState<MealDto | null>(null);
    const [mealName, setMealName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileInputRef, setfileInputRef] = useState<HTMLInputElement | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ mealName?: string, price?: string, description?: string, categoryId?: string }>();

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await GetDetailMeal(mealId as string);
                setMealName(response?.value.mealName);
                setPrice(response?.value.price);
                setDescription(response?.value.description);
                setImageUrl(response?.value.imageUrl);
                setCategoryId(response?.value.categoryId);
                setCategoryName(response?.value.categoryName);

            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        };
        fetchMealData();
    }, [mealId]);

    useEffect(() => {
        fetch('https://restaurantmanagement.azurewebsites.net/api/category/category-info')
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
        // if (!validateForm()) {
        //     return;
        // }
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
                    setTimeout(() => {
                        navigate('/meals');
                    }, 2000);
                } else {
                    console.log('Failed');
                    notifyError();
                }
            }
        } catch (error) {
            console.error('Failed to update meal:', error);
        }
    };

    const validateForm = () => {
        const newErrors: { mealName?: string, price?: string, description?: string, categoryId?: string } = {
            mealName: mealName ? '' : 'Tên món không được để trống',
            price: price ? '' : 'Giá không được để trống',
            description: description ? '' : 'Mô tả không được để trống',
            categoryId: categoryId ? '' : 'Loại món không được để trống'
        };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
    };

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
    };

    return (
        <>
            <main className="container">
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/dashboard"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/meals"><td>Meal</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Update</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                {/* Form for updating meal */}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column align-items-center text-center p-3">
                                <img
                                    className=" mb-3"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                    src={imageUrl ?? 'https://via.placeholder.com/200'}
                                    alt="Meal Image"
                                />
                                <input
                                    type="file"
                                    className="form-control"
                                    ref={setfileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    type="primary"
                                    icon={<UploadOutlined />}
                                    onClick={() => fileInputRef?.click()}
                                >
                                    Upload Image
                                </Button>
                            </div>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="p-3 py-5">
                                <div className="mb-3">
                                    <label htmlFor="mealName" className="form-label">Meal Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mealName"
                                        value={mealName}
                                        onChange={(event) => setMealName(event.target.value)}
                                    />
                                    {errors?.mealName && <div className="text-danger">{errors.mealName}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        value={price}
                                        onChange={(event) => setPrice(Number(event.target.value))}
                                    />
                                    {errors?.price && <div className="text-danger">{errors.price}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    {errors?.description && <div className="text-danger">{errors.description}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    {isInputFocused ? (
                                        <select
                                            className="form-select"
                                            id="category"
                                            value={categoryId}
                                            onChange={(event) => {
                                                const selectedCategory = categoryInfo.find(category => category.categoryId === event.target.value);
                                                setCategoryId(event.target.value);
                                                setCategoryName(selectedCategory ? selectedCategory.categoryName : '');
                                                setIsInputFocused(false);
                                            }}
                                        >
                                            {categoryInfo.map(category => (
                                                <option key={category.categoryId} value={category.categoryId}>
                                                    {category.categoryName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={categoryName}
                                            onFocus={() => setIsInputFocused(true)}
                                            readOnly
                                        />
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
            <ToastContainer />
        </>
    );
};

export default UpdateMealPage;
