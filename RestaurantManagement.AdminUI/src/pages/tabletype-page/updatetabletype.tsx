import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetDetailTableType, UpdateTableType } from "../../services/tabletype-services";
import { Breadcrumb, Col, Row, Image, Button, notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const UpdateTableTypePage = () => {
    const { tableTypeId } = useParams<{ tableTypeId: string }>();
    const [tableTypeName, setTableTypeName] = useState<string>('');
    const [tableCapacity, setTableCapacity] = useState<number>(0);
    const [tableStatus, setTableStatus] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [tablePrice, setTablePrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<{ tableTypeName?: string, tableCapacity?: string, tableStatus?: string, tablePrice?: string, description?: string }>({});
    const navigate = useNavigate();

    // Fetch table type data when the component is mounted or when tableTypeId changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (tableTypeId) {
                    const response = await GetDetailTableType(tableTypeId);
                    if (response && response.value) {
                        setTableTypeName(response.value.tableTypeName);
                        setTableCapacity(response.value.capacity);
                        setTablePrice(response.value.tablePrice);
                        setDescription(response.value.description);
                        setImageUrl(response.value.image);
                    }
                } else {
                    console.error('Table Type Id is not defined');
                }
            } catch (error) {
                console.error('Error fetching table type data:', error);
            }
        };
        fetchData();
    }, [tableTypeId]);

    // Handle file input change (image upload)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string); // Set the image URL to preview it
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate the form fields
    const validateForm = () => {
        const newErrors: { tableTypeName?: string, tableCapacity?: string, tableStatus?: string, tablePrice?: string, description?: string } = {};

        if (!tableTypeName) {
            newErrors.tableTypeName = 'Please enter the table type name';
        }
        if (!tableCapacity) {
            newErrors.tableCapacity = 'Please enter the table capacity';
        }
        if (!tableStatus) {
            newErrors.tableStatus = 'Please enter the table status';
        }
        if (!tablePrice) {
            newErrors.tablePrice = 'Please enter the table price';
        }
        if (!description) {
            newErrors.description = 'Please enter the description';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn form reload trang khi nhấn nút submit

        // Xử lý gửi dữ liệu form
        const formData = new FormData();
        formData.append('tableTypeName', tableTypeName);
        formData.append('tableCapacity', tableCapacity.toString());
        formData.append('tableStatus', tableStatus);
        formData.append('tablePrice', tablePrice.toString());
        formData.append('description', description);

        // Kiểm tra và đính kèm hình ảnh nếu có
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            if (tableTypeId) {
                const response = await UpdateTableType(tableTypeId, formData); // Gọi API cập nhật dữ liệu
                console.log("API Response:", response);
                notification.success({
                    message: 'Cập nhật loại bàn thành công',
                    description: 'Dữ liệu loại bàn đã được cập nhật'
                }); // Hiển thị thông báo cập nhật thành công
                setTimeout(() => {
                    navigate('/tabletypes'); // Chuyển hướng về danh sách table types sau khi cập nhật thành công
                }, 2000);
            } else {
                console.log("Table Type Id is not found");  // Nếu không có tableTypeId
            }
        } catch (error: any) {
            console.log("Failed update:", error);  // Nếu có lỗi trong quá trình gọi API
        }
    };


    return (
        <>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/tabletypes">Table Type</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Update</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <form onSubmit={handleSubmit} className="col-md-12">
                <Row gutter={[16, 24]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        {/* Image Upload */}
                        <div className="mb-3">
                            <Image
                                src={imageUrl || 'https://via.placeholder.com/200'}
                                alt="Table Type"
                                width={200}
                                height={200}
                                style={{ objectFit: 'cover' }}
                                className="mb-3"
                            />
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                onClick={() => fileInputRef.current?.click()}
                                style={{ display: 'block', marginLeft: 30, marginTop: 16 }}
                            >
                                Upload Image
                            </Button>

                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={16}>
                        {/* Input Fields */}
                        <div className="form-group mb-3">
                            <label htmlFor="tableTypeName">Table Type Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tableTypeName"
                                placeholder="Enter table type name"
                                value={tableTypeName}
                                onChange={(e) => setTableTypeName(e.target.value)}
                            />
                            {errors.tableTypeName && <p style={{ color: 'red' }}>{errors.tableTypeName}</p>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="tableCapacity">Table Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tableCapacity"
                                placeholder="Enter table capacity"
                                value={tableCapacity}
                                onChange={(e) => setTableCapacity(parseInt(e.target.value))}
                            />
                            {errors.tableCapacity && <p style={{ color: 'red' }}>{errors.tableCapacity}</p>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="tablePrice">Table Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tablePrice"
                                placeholder="Enter table price"
                                value={tablePrice}
                                onChange={(e) => setTablePrice(parseInt(e.target.value))}
                            />
                            {errors.tablePrice && <p style={{ color: 'red' }}>{errors.tablePrice}</p>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Update
                        </button>
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default UpdateTableTypePage;
