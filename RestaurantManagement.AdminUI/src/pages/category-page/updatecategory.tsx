import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateCategory } from '../../services/category-service';
import { Breadcrumb, Col, Row } from 'antd';

const UpdateCategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [categoryName, setCategoryName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState<{ categoryName?: string }>({});
    const navigate = useNavigate();

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
                    setTimeout(() => {
                        navigate('/categories'); // Điều hướng đến trang danh sách sau khi lưu thành công
                    }, 2000);
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
            <form onSubmit={handleSubmit} className='col-md-12'>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/categories">Category</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Update</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24} md={12}>
                        <div className="row" key={categoryId}>
                            {imageUrl && (
                                <div className="mb-3 col-md-6">
                                    <img src={imageUrl} alt="Selected" className="img-thumbnail" />
                                </div>
                            )}
                            <div className="col-md-6">
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
                                <button type="submit" className="btn btn-primary">Update Category</button>

                            </div>

                        </div>
                    </Col>
                </Row>
            </form>
            <main className="container">

            </main>
            <ToastContainer />
        </>
    );
};

export default UpdateCategoryPage;