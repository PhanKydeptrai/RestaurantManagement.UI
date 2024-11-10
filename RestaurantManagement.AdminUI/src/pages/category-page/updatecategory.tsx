import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateCategory } from '../../services/category-service';

const UpdateCategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [categoryName, setCategoryName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState<{ categoryName?: string }>({});
    const [isSuccess, setIsSuccess] = useState();

    useEffect(() => {
        // Fetch category data using categoryId and set initial state
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/category/${categoryId}`);
                const data = await response.json();
                console.log(data);
                setCategoryName(data.value.categoryName);
                setImageUrl(data.value.imageUrl);
                console.log(categoryName);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

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

    const validateForm = () => {
        const newErrors: { categoryName?: string } = {}
        if (!categoryName) {
            newErrors.categoryName = "Vui lòng nhập tên loại món";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('categoryImage', fileInputRef.current.files[0]);
        }
        try {
            if (categoryId) {
                const response = await UpdateCategory(categoryId, formData);
                console.log('Category updated successfully:', response);
                if (response.isSuccess) {
                    console.log("Success");
                    notifySucess();
                } else {
                    console.log("Failed");
                    notifyError();
                }
            } else {
                throw new Error('Category ID is undefined');
            }
        }
        catch (error: any) {
            console.error('Failed to update category:', error.response.data);
        }



    };

    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Update</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row" key={categoryId}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">Category Name:</label>
                            <input
                                type="text"
                                id="categoryName"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            {errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">Upload Image:</label>
                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        {imageUrl && (
                            <div className="mb-3">
                                <img src={imageUrl} alt="Selected" className="img-thumbnail" />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">Update Category</button>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </>
    );
};

export default UpdateCategoryPage;