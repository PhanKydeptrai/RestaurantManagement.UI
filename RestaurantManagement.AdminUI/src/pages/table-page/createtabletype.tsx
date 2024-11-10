import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CreateTableType } from "../../services/tabletype-services";
import { Link, useNavigate } from "react-router-dom";

const CreateTableTypePage = () => {
    const [tableTypeName, setTableTypeName] = useState('');
    const [status, setStatus] = useState('');
    const [tablePrice, setTablePrice] = useState('');
    const [description, setDescription] = useState('');
    const [tableCapacity, setTableCapacity] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ tableTypeName?: string, status?: string, tablePrice?: string, tableCapacity?: string }>();


    const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    const validationForm = () => {
        const newErrors: { tableTypeName?: string, status?: string, tablePrice?: string, tableCapacity?: string } = {};
        if (!tableTypeName) {
            newErrors.tableTypeName = 'Vui lòng nhập tên loại bàn!';
        }
        // if (!status) {
        //     newErrors.status = 'Vui lòng nhập trạng thái!';
        // }
        if (!tablePrice) {
            newErrors.tablePrice = 'Vui lòng nhập giá bàn!';
        }
        if (isNaN(Number(tablePrice))) {
            newErrors.tablePrice = 'Vui lòng nhập số!';
        }
        if (!tableCapacity) {
            newErrors.tableCapacity = 'Vui lòng nhập số lượng!';
        }
        if (isNaN(Number(tableCapacity))) {
            newErrors.tableCapacity = 'Vui lòng nhập số!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validationForm()) {
            notifyError();
            return;
        }
        const formData = new FormData();
        formData.append('tableTypeName', tableTypeName);
        formData.append('status', status);
        formData.append('tablePrice', tablePrice);
        formData.append('description', description);
        formData.append('tableCapacity', tableCapacity);
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('imageUrl', fileInputRef.current.files[0]);
        }

        const response = await CreateTableType(formData);
        console.log(response);
        if (response) {
            notifySucess();
            setTimeout(() => {
                navigate('/tables');
            }, 2000);
        } else {
            notifyError();
        }
    }
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <>

            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active">TableType</li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form className="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tableTypeName">Tên loại bàn</label>
                        <input type="text" className="form-control" id="tableTypeName" placeholder="Tên loại bàn" value={tableTypeName} onChange={(e) => setTableTypeName(e.target.value)} />
                        {errors?.tableTypeName && <div className="text-danger">{errors.tableTypeName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tablePrice">Giá bàn</label>
                        <input type="text" className="form-control" id="tablePrice" placeholder="Giá bàn" value={tablePrice} onChange={(e) => setTablePrice(e.target.value)} />
                        {errors?.tablePrice && <div className="text-danger">{errors.tablePrice}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tableCapacity">Số lượng</label>
                        <input type="text" className="form-control" id="tableCapacity" placeholder="Số lượng" value={tableCapacity} onChange={(e) => setTableCapacity(e.target.value)} />
                        {errors?.tableCapacity && <div className="text-danger">{errors.tableCapacity}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea typeof="text" className="form-control" id="description" placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Hình ảnh</label>
                        <input type="file" className="form-control" id="imageUrl" placeholder="Hình ảnh" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                        <img src={imageUrl ?? undefined} alt="" style={{ width: '100px', height: '100px' }} onClick={handleFileSelect} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
            <ToastContainer />
        </>
    )
}

export default CreateTableTypePage;