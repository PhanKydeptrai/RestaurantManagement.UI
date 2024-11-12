import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateMeal } from "../../services/meal-services";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
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
        fetch('https://localhost:7057/api/category/category-info')
            .then(response => response.json())
            .then(data => setCategoryInfo(data.value))
            .catch(error => console.log(error));
    }, []);

    const handleCategoryChange = (value: string) => {
        const selectedCategory = categoryinfo.find(category => category.categoryId === value);
        setCategoryId(value);
        setCategoryName(selectedCategory ? selectedCategory.categoryName : '');
    };

    const handleFileChange = (file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
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

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('mealname', values.mealname);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('imageUrl', fileInputRef.current.files[0]);
        }

        const response = await CreateMeal(formData);

        if (response.isSuccess) {
            notifySuccess();
            setTimeout(() => {
                navigate('/meals');
            }, 2000);
        } else {
            notifyError();
        }
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Form onFinish={handleSubmit} layout="vertical">
                <main className="container">
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
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className=" mt-5" width="350px" src={imageUrl || 'https://via.placeholder.com/350'} alt="" />
                                        <Button type="primary" icon={<UploadOutlined />} onClick={handleFileSelect} className="mt-3">
                                            Chọn ảnh
                                        </Button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e.target.files?.[0]!)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-9 border-right">
                                    <div className="p-3 py-5">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Form>
        </>
    );
};

export default CreateMealPage;
