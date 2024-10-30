import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CreateTableType } from "../../services/tabletype-services";

const CreateTableTypePage = () => {
    const [tableTypeName, setTableTypeName] = useState('');
    const [status, setStatus] = useState('');
    const [tablePrice, setTablePrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('tableTypeName', tableTypeName);
        formData.append('status', status);
        formData.append('tablePrice', tablePrice);
        formData.append('description', description);
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('imageUrl', fileInputRef.current.files[0]);
        }
        const response = await CreateTableType(formData);
        console.log(response);
        if (response) {
            notifySucess();
        }
    }
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <>
            <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tableTypeName">Tên loại bàn</label>
                    <input type="text" className="form-control" id="tableTypeName" placeholder="Tên loại bàn" value={tableTypeName} onChange={(e) => setTableTypeName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="tablePrice">Giá bàn</label>
                    <input type="text" className="form-control" id="tablePrice" placeholder="Giá bàn" value={tablePrice} onChange={(e) => setTablePrice(e.target.value)} />
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
        </>
    )
}

export default CreateTableTypePage;