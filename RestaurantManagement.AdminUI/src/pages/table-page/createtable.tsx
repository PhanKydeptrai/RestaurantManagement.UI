import { useEffect, useState } from "react";

interface TableTypeInfo {
    tableTypeId: string;
    tableTypeName: string;
}
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Select, notification, Form } from "antd";

const { Option } = Select;

const CreateTablePage = () => {
    const [quantity, setQuantity] = useState(0);
    const [tableTypeName, setTableTypeName] = useState('');
    const [tableTypeId, setTableTypeId] = useState('');
    const [errors, setErrors] = useState<{ quantity?: string, tableTypeName?: string, tableTypeId?: string }>();
    const navigate = useNavigate();

    const [tableTypeInfo, setTableTypeInfo] = useState<TableTypeInfo[]>([]);

    useEffect(() => {
        fetch('https://localhost:7057/api/tabletype/tabletype-info')
            .then(response => response.json())
            .then(data => setTableTypeInfo(data.value))
            .catch(error => console.log(error));
    }, []);

    const handleTableTypeChange = (value: string) => {
        const selectedTableType = tableTypeInfo.find(table => table.tableTypeId === value);
        setTableTypeId(value);
        setTableTypeName(selectedTableType ? selectedTableType.tableTypeName : '');
    };

    const validationForm = () => {
        const newErrors: { quantity?: string, tableTypeName?: string, tableTypeId?: string } = {};
        if (!quantity) {
            newErrors.quantity = 'Vui lòng nhập số lượng!';
        }
        if (isNaN(quantity)) {
            newErrors.quantity = 'Vui lòng nhập số!';
        }
        if (!tableTypeId) {
            newErrors.tableTypeId = 'Vui lòng chọn loại bàn!';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const notifyError = () => {
        notification.error({
            message: 'Lỗi',
            description: 'Vui lòng kiểm tra lại!',
            placement: 'top',
        });
    }

    const notifySuccess = () => {
        notification.success({
            message: 'Thành công',
            description: 'Tạo bàn thành công!',
            placement: 'top',
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validationForm()) {
            notifyError();
            return;
        }

        const data = {
            quantity: quantity,
            tableTypeId: tableTypeId,
            tableTypeName: tableTypeName
        };

        console.log('Data to be sent:', data);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch('https://localhost:7057/api/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify(data),

            });

            console.log(response.body);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('HTTP error! status:', response.status, 'Error data:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle successful response
            console.log('Success:', await response.json());
            notifySuccess();
            setTimeout(() => {
                navigate('/tables');
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            notifyError();
        }
    };

    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/tables">Tables</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <Form onSubmitCapture={handleSubmit} layout="vertical">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <Form.Item
                                        label="Quantity"
                                        validateStatus={errors?.quantity ? 'error' : ''}
                                        help={errors?.quantity}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="Enter quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-6">
                                    <Form.Item
                                        label="Table Type"
                                        validateStatus={errors?.tableTypeId ? 'error' : ''}
                                        help={errors?.tableTypeId}
                                    >
                                        <Select
                                            placeholder="Select Table Type"
                                            value={tableTypeId}
                                            onChange={handleTableTypeChange}
                                        >
                                            <Option value="">Select Table Type</Option>
                                            {Array.isArray(tableTypeInfo) && tableTypeInfo.map((tableType: TableTypeInfo) => (
                                                <Option key={tableType.tableTypeId} value={tableType.tableTypeId}>
                                                    {tableType.tableTypeName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </div>
                    </div>
                </Form>
            </main>
        </>
    );
};

export default CreateTablePage;
