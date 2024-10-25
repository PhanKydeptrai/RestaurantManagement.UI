import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateEmployee } from "../../services/employee-service";

const CreateEmployeePage = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userImage, setUserImage] = useState<string | null>(null);
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result as string);
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
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('gender', gender);
        formData.append('role', role);

        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('userImage', fileInputRef.current.files[0]);
        }
        const response = await CreateEmployee(formData);
        console.log(response);

        if (response) {
            notifySucess();
        }
    }

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <form className="" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/employees">Employees</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="200" src={userImage || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="" />
                                    <button className="btn btn-success mt-3" onClick={handleFileSelect}>Chọn ảnh</button>
                                    <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">First Name</label>
                                            <input type="text" className="form-control" placeholder="Nhập tên" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Last Name</label>
                                            <input type="text" className="form-control" placeholder="Nhập họ" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label className="labels">Email</label>
                                            <input type="text" className="form-control" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="labels">Phone Number</label>
                                            <input type="text" className="form-control" placeholder="Nhập số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Gender</label>
                                            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="">Chọn giới tính</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Orther">Orther</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Role</label>
                                            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                                <option value="">Chọn vai trò</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Receptionist">Receptionist</option>
                                                <option value="Waiter">Waiter</option>
                                                <option value="Cashier">Cashier</option>
                                                <option value="Chef">Chef</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <span className="col-md-3"></span>
                                        <div className="col-md-6"></div>
                                        <span className="col-md-3">
                                            <button className="btn btn-success mt-3" type="submit">Lưu</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CreateEmployeePage;