import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CreateTableType } from "../../services/tabletype-services";
import { Link, useNavigate } from "react-router-dom";
import { Button, Image } from "antd";

const CreateTableTypePage = () => {
    const [tableTypeName, setTableTypeName] = useState('');
    const [status, setStatus] = useState('');
    const [tablePrice, setTablePrice] = useState('');
    const [description, setDescription] = useState('');
    const [tableCapacity, setTableCapacity] = useState(0);
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
    };

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
    };

    const validationForm = () => {
        const newErrors: { tableTypeName?: string, status?: string, tablePrice?: string, tableCapacity?: string } = {};
        if (!tableTypeName) {
            newErrors.tableTypeName = 'Vui lòng nhập tên loại bàn!';
        }
        if (!tablePrice) {
            newErrors.tablePrice = 'Vui lòng nhập giá bàn!';
        }
        if (isNaN(Number(tablePrice))) {
            newErrors.tablePrice = 'Vui lòng nhập số!';
        }
        if (!tableCapacity) {
            newErrors.tableCapacity = 'Vui lòng nhập số lượng!';
        } else if (isNaN(Number(tableCapacity))) {
            newErrors.tableCapacity = 'Vui lòng nhập một số hợp lệ!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
        formData.append('tableCapacity', tableCapacity.toString());
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }
        console.log(tableCapacity); // Kiểm tra xem giá trị tableCapacity có chính xác không


        const response = await CreateTableType(formData);
        if (response) {
            notifySucess();
            setTimeout(() => {
                navigate('/tabletypes');
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
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item active">TableType</li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Input fields (left side) */}
                        <div className="col-md-6 col-12">
                            <div className="form-group mb-3">
                                <label htmlFor="tableTypeName">Tên loại bàn</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tableTypeName"
                                    placeholder="Tên loại bàn"
                                    value={tableTypeName}
                                    onChange={(e) => setTableTypeName(e.target.value)}
                                />
                                {errors?.tableTypeName && <div className="text-danger">{errors.tableTypeName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="tablePrice">Giá bàn</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tablePrice"
                                    placeholder="Giá bàn"
                                    value={tablePrice}
                                    onChange={(e) => setTablePrice(e.target.value)}
                                />
                                {errors?.tablePrice && <div className="text-danger">{errors.tablePrice}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="tableCapacity">Số lượng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tableCapacity"
                                    placeholder="Số lượng"
                                    value={tableCapacity}
                                    onChange={(e) => setTableCapacity(parseInt(e.target.value))}
                                />
                                {errors?.tableCapacity && <div className="text-danger">{errors.tableCapacity}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="description">Mô tả</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Image upload (right side) */}
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center mb-3">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <Image
                                    width={200}
                                    src={imageUrl || 'https://via.placeholder.com/350'}
                                    alt="Category"
                                />
                                <Button className="mt-3" onClick={handleFileSelect}>Chọn ảnh</Button>
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
            </main>

            {/* Toast Notifications */}
            <ToastContainer />
        </>
    );
};

export default CreateTableTypePage;
