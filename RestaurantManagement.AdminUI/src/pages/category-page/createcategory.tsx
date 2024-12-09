import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateCategory } from "../../services/category-service";
import { Breadcrumb, Col, Row, Image, Button, Input } from "antd";



const CreateCategoryPage = () => {
    const [name, setName] = useState(''); // Tên loại món
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Ảnh loại món
    //const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ name?: string }>({}); // Kiểm tra validatiom tại validation form
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Tham chiếu đến input file -> lấy ảnh từ máy
    const navigate = useNavigate(); // chuyển trang

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
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
        const newErrors: { name?: string } = {}
        if (!name) {
            newErrors.name = "Vui lòng nhập tên loại món";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            notifyError();
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        //formData.append('description', description);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        const response = await CreateCategory(formData);
        console.log(response);

        //Show toast success
        if (response.isSuccess) {
            notification.success({
                message: "Thành công",
                description: "Thêm loại món thành công!"
            })
            setTimeout(() => {
                navigate('/categories'); // Điều hướng đến trang danh sách sau khi lưu thành công
            }, 2000);
        }
        else {
            notification.error({
                message: "Thất bại",
                description: "Thêm loại món thất bại! Vui lòng kiểm tra lại thông tin!"
            });

        }

    }




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
                                <Link to="/categories">Category</Link>
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
                        <div className="p-3 py-3">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Tên loại món">
                                        <Input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nhập tên loại món"
                                        />
                                        {errors.name && <p className="text-danger">{errors.name}</p>}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Button className="text-center" type="primary" htmlType="submit">Lưu</Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <ToastContainer />
            </form>
        </>
    )

}
export default CreateCategoryPage;


