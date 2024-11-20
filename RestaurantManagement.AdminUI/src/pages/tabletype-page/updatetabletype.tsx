import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateTableType } from "../../services/tabletype-services";
import { Breadcrumb, Col, Row } from "antd";

const UpdateTableTypePage = () => {
    const { tableTypeId } = useParams<{ tableTypeId: string }>();
    const [tableTypeName, setTableTypeName] = useState<string>('');
    const [tablecapacity, setTableCapacity] = useState<number>(0);
    const [tablestatus, setTableStatus] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [tablePrice, setTablePrice] = useState<number>(0);
    const [desscription, setDesscription] = useState<string>('');
    const [errors, setErrors] = useState<{ tableTypeName?: string, tablecapacity?: string, tablestatus?: string, tablePrice?: string, desscription?: string }>({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/tabletype/${tableTypeId}`);
                const data = await response.json();
                console.log(data);
                setTableTypeName(data.value.tableTypeName);
                setTableCapacity(data.value.capacity);
                setTableStatus(data.value.status);
                setImageUrl(data.value.imageUrl);
                setTablePrice(data.value.tablePrice);
                setDesscription(data.value.desscription);

            } catch (error) {
                console.error('Error fetching table type data:', error);
            }
        }; fetchdata();
    }, [tableTypeId]);

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
        const newErrors: { tableTypeName?: string, tablecapacity?: string, tablestatus?: string, tablePrice?: string, desscription?: string } = {}
        if (!tableTypeName) {
            newErrors.tableTypeName = 'Vui lòng nhập tên loại bàn';
        }
        if (!tablecapacity) {
            newErrors.tablecapacity = 'Vui lòng nhập số lượng bàn';
        }
        if (!tablestatus) {
            newErrors.tablestatus = 'Vui lòng nhập trạng thái bàn';
        }
        if (!tablePrice) {
            newErrors.tablePrice = 'Vui lòng nhập giá bàn';
        }
        if (!desscription) {
            newErrors.desscription = 'Vui lòng nhập mô tả';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted");  // Kiểm tra xem form có được gửi hay không
        // if (!validateForm()) {
        //     return;
        // }
        const formData = new FormData();
        formData.append('tableTypeName', tableTypeName);
        formData.append('tablecapacity', tablecapacity.toString());
        formData.append('tablestatus', tablestatus);
        formData.append('tablePrice', tablePrice.toString());
        formData.append('desscription', desscription);
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            if (tableTypeId) {
                const response = await UpdateTableType(tableTypeId, formData);
                console.log("Response from API:", response);  // Kiểm tra phản hồi từ API
                if (response.isSuccess) {
                    console.log("Successfully updated");
                    setTimeout(() => {
                        navigate('/tabletypes');
                    }, 2000);
                } else {
                    console.log("Update failed", response);  // Thêm log nếu có lỗi
                }
            } else {
                console.log("Table Type Id is not found");
            }
        } catch (error: any) {
            console.log("Failed update: ", error.response?.data);  // Log nếu có lỗi
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="col-md-12">
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

                <Row gutter={16} key={tableTypeId}>
                    <Col span={24} md={12}>
                        {/* Column for Image Upload */}
                        <div className="mb-3">
                            {imageUrl && (
                                <div className="col-md-12">
                                    <img
                                        src={imageUrl}
                                        alt="Selected"
                                        className="img-thumbnail"
                                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <label htmlFor="fileInput" className="form-label">Upload Image</label>
                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    </Col>

                    <Col span={24} md={12}>
                        {/* Column for Input Fields */}
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
                            <label htmlFor="tablecapacity">Table Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tablecapacity"
                                placeholder="Enter table capacity"
                                value={tablecapacity}
                                onChange={(e) => setTableCapacity(parseInt(e.target.value))}
                            />
                            {errors.tablecapacity && <p style={{ color: 'red' }}>{errors.tablecapacity}</p>}
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
                            <label htmlFor="desscription">Description</label>
                            <textarea
                                className="form-control"
                                id="desscription"
                                placeholder="Enter description"
                                value={desscription}
                                onChange={(e) => setDesscription(e.target.value)}
                            />
                            {errors.desscription && <p style={{ color: 'red' }}>{errors.desscription}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary">Update</button>
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default UpdateTableTypePage;
