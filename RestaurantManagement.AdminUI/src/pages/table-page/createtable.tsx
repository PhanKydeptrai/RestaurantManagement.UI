import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export interface TableTypeInfo {
    tableTypeId: string;
    tableTypeName: string;
}

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
            .catch(error => console.log(error))
    })

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTableType = tableTypeInfo.find(table => table.tableTypeId === event.target.value);
        setTableTypeId(event.target.value);
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

            if (!response.ok) {
                const errorData = await response.json();
                console.error('HTTP error! status:', response.status, 'Error data:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle successful response
            console.log('Success:', await response.json());
            notifySucess();
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
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/tables">Tables</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="quanlity">Quanlity</label>
                                        <input type="number" className="form-control" id="quanlity" placeholder="Enter quanlity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                        {errors?.quantity && <div className="text-danger">{errors.quantity}</div>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="tableTypeId">Table Type</label>
                                        <select className="form-select" id="tableTypeId" value={tableTypeId} onChange={handleTableTypeChange}>
                                            <option value="">Select Table Type</option>
                                            {Array.isArray(tableTypeInfo) && tableTypeInfo.map((tableType: TableTypeInfo) => (
                                                <option key={tableType.tableTypeId} value={tableType.tableTypeId}>{tableType.tableTypeName}</option>
                                            ))}
                                        </select>
                                        {errors?.tableTypeId && <div className="text-danger">{errors.tableTypeId}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </main>
            <ToastContainer />
        </>
    )
}


export default CreateTablePage;