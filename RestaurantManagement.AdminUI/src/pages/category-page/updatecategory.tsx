import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { GetDetailCategory, UpdateCategory } from '../../services/category-service';
import { Breadcrumb, Button, Col, Row, Image, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UpdateCategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>(); // lấy id của category lên url
    const [categoryName, setCategoryName] = useState<string>(''); 
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState<{ categoryName?: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch category data using categoryId and set initial state
        const fetchCategoryData = async () => {
            try {
                if (categoryId) {
                    const response = await GetDetailCategory(categoryId);
                    if (response && response.value) {
                        setCategoryName(response.value.categoryName);
                        setImageUrl(response.value.imageUrl);
                    }
                }
                else {
                    throw new Error('Category ID is undefined');
                }
            } catch (error: any) {
                console.error('Failed to fetch category data:', error.response?.data);
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
        if(categoryName.length < 50){
            newErrors.categoryName = "Tên loại món không được quá 50 ký tự";
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
                    notification.success({
                        message:  "Cập nhật thành công",
                        description: "Loại món đã đưọc cập nhật thành công!"
                    })
                    setTimeout(() => {
                        navigate('/categories'); // Redirect to category list after success
                    }, 2000);
                    notifySucess();
                } else {
                    notification.error({
                        message: "Cập nhật thất bại",
                        description: "Xin lỗi, chúng tôi không thể cập nhật loại món này. Vui lòng thử lại sau."
                        });
                    console.log("Failed");
                    notifyError();
                }
            } else {
                throw new Error('Category ID is undefined');
            }
        } catch (error: any) {
            console.error('Failed to update category:', error.response?.data);
        }
    };

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/dashboard">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/categories">Category</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Update</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <form onSubmit={handleSubmit} className='col-md-12'>
                <Row gutter={[16, 24]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <div className="form-container">
                            <div className="mb-3">
                                <Image
                                    src={imageUrl || 'https://via.placeholder.com/200'}
                                    alt="category"
                                    width={200}
                                    height={200}
                                // style={{ objectFit: 'cover' }}
                                />
                                <Button
                                    type="primary"
                                    icon={<UploadOutlined />}
                                    onClick={() => fileInputRef?.current?.click()}
                                    style={{ display: 'block', marginLeft: 30, marginTop: 16 }}
                                >
                                    Upload Image
                                </Button>

                                <input
                                    type="file"
                                    id="fileInput"
                                    className="form-control"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={16}>
                        <div className="col-md-6">
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
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Update Category
                            </button>
                        </div>
                    </Col>
                </Row>
            </form>
            <ToastContainer />
        </>
    );
};

export default UpdateCategoryPage;
