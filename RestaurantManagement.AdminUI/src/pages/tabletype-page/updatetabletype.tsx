import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateTableType } from "../../services/tabletype-services";
import { Breadcrumb, Col, Row, Image, Button } from "antd";
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
                const response = await fetch(`https://localhost:7057/api/tabletype/${tableTypeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'
                    }
                });

                const data = await response.json();
                // Ensure the data returned matches the state names and structure
                setTableTypeName(data.value.tableTypeName);
                setTableCapacity(data.value.tableCapacity);
                setTableStatus(data.value.tableStatus);
                setImageUrl(data.value.imageUrl);
                setTablePrice(data.value.tablePrice);
                setDescription(data.value.description);
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
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('tableTypeName', tableTypeName);
        formData.append('tableCapacity', tableCapacity.toString());
        formData.append('tableStatus', tableStatus);
        formData.append('tablePrice', tablePrice.toString());
        formData.append('description', description);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]); // Assuming image is part of the form
        }

        try {
            if (tableTypeId) {
                const response = await UpdateTableType(tableTypeId, formData);
                console.log("Response from API:", response);  // Check the response from the API
                if (response.success) {  // Assuming `success` field is returned in the response
                    console.log("Successfully updated");
                    setTimeout(() => {
                        navigate('/tabletypes'); // Redirect after successful update
                    }, 2000);
                } else {
                    console.log("Update failed:", response);  // Log failure
                }
            } else {
                console.log("Table Type Id is not found");
            }
        } catch (error: any) {
            console.log("Failed update:", error);  // Log if there's an error
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
                            {/* <label htmlFor="fileInput" className="form-label">Upload Image</label> */}
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

                    <Col span={24} md={12}>
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default UpdateTableTypePage;

