import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateMeal } from "../../services/meal-services";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Col, Form, Input, Row, Select, Upload, message, Image, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
    const [categoryinfo, setCategoryInfo] = useState<CategoryInfo[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restaurantmanagement.azurewebsites.net/api/category/category-info')
            .then(response => response.json())
            .then(data => setCategoryInfo(data.value))
            .catch(error => console.log(error));
    }, []);

    const handleCategoryChange = (value: string) => {
        const selectedCategory = categoryinfo.find(category => category.categoryId === value);
        setCategoryId(value);
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
        const errors: { mealName?: string, price?: string, categoryId?: string } = {};
        if (!mealname) errors.mealName = 'Tên món không được để trống';
        if (!price) errors.price = 'Giá không được để trống';
        if (!categoryId) errors.categoryId = 'Loại món không được để trống';
        return errors;
    };

    const notifySuccess = () => {
        toast.success('Thêm món ăn thành công!', {
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
        toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            notifyError();
            return;
        }
        const formData = new FormData();
        formData.append('mealname', mealname);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);


        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        const response = await CreateMeal(formData);
        console.log(response);

        if (response.isSuccess) {
            notification.success({
                message: "Thành công",
                description: "Thêm món ăn thành công!",
            });
            setTimeout(() => {
                navigate('/meals');
            }, 2000);
        } else {
            notification.error({
                message: "Thêm món thất bại",
                description: "Thêm món ăn thất bại! Vui lòng kiểm tra lại thông tin!",
            })
        }
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>

                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/meals">Meal</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Create</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24} md={6}>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <Image
                                width={200}
                                src={imageUrl || 'https://via.placeholder.com/350'}
                                alt="Category"
                            />
                            <Button className="mt-3" onClick={handleFileSelect}>Chọn ảnh</Button>
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                        </div>
                    </Col>
                    <Col span={24} md={18}>
                        <Form.Item label="Tên món" name="mealname" rules={[{ required: true, message: 'Tên món không được để trống' }]}>
                            <Input placeholder="Nhập tên món" value={mealname} onChange={(e) => setMealName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Giá không được để trống' }]}>
                            <Input placeholder="Nhập giá" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description">
                            <Input.TextArea placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Tên loại món" name="categoryId" rules={[{ required: true, message: 'Loại món không được để trống' }]}>
                            <Select value={categoryId} onChange={handleCategoryChange}>
                                <Select.Option value="">Select Category</Select.Option>
                                {categoryinfo.map((category) => (
                                    <Select.Option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="mt-3">
                            Create Meal
                        </Button>
                    </Col>
                </Row>

            </form>
        </>
    );
};

export default CreateMealPage;
