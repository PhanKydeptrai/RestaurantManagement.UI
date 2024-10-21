import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CreateCategory } from "../../services/createcategoryservice";




const CreateCategoryPage = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const [description, setDescription] = useState('');
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            const response = await CreateCategory(formData);
            console.log(response);
            // Xử lý phản hồi từ server nếu cần thiết
        } catch (error) {
            console.error('Error creating category:', error);
        }
    }

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <main className="container">
                    <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <div className="col ">
                            <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                                <ol className="breadcrumb mb-0 ">
                                    <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                    <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Create</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className=" mt-5" width="350px" src={imageUrl || 'https://via.placeholder.com/350'} alt="" />
                                        <button type="button" className="btn btn-success mt-3" onClick={handleFileSelect}>
                                            Chọn ảnh
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-9 border-right">
                                    <div className="p-3 py-5">
                                        <div className="row mt-3">
                                            <div className="col-md-9 m-lg-3"><label className="labels">Tên loại món</label>
                                                <input type="text" className="form-control" placeholder="Nhập tên loại danh mục"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} /></div>
                                        </div>
                                        <div className="row mt-2">
                                            <span className="col-md-3"></span>
                                            <div className="col-md-3"></div>
                                            <span className="col-md-6"><button className="btn btn-success mt-3" type="submit">Lưu thay đổi</button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </form>
        </>
    )

}
export default CreateCategoryPage;


