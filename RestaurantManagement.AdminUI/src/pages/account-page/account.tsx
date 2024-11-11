import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { EmployeeDto } from "../../models/employeeDto";

const AccountPage = () => {
    const [userDetails, setUserDetails] = useState<EmployeeDto | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // useRef for file input

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('https://localhost:7057/api/account/account-emp-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data?.value) {
                    setUserDetails(response.data.value);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EmployeeDto) => {
        if (userDetails) {
            setUserDetails({
                ...userDetails,
                [field]: e.target.value,
            });
        }
    };

    const handleImageChange = () => {
        if (fileInputRef.current?.files) {
            const file = fileInputRef.current.files[0];
            if (file) {
                // Here, you can handle the file upload logic.
                console.log('Image file selected:', file);
                // Example: Update user image URL after upload
                setUserDetails({
                    ...userDetails!,
                    userImage: URL.createObjectURL(file) // This is just for demonstration, actual upload is required
                });
            }
        }
    };

    if (!userDetails) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <form>
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="/"><dt>Dashboard</dt></Link>
                                </li>
                                <li className="breadcrumb-item" aria-current="page">Account</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12" key={userDetails?.userId}>
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5"
                                        width="200"
                                        src={userDetails?.userImage || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'}
                                        alt="User"
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary mt-2">Change Image</button>
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter first name"
                                                value={userDetails?.firstName || ''}
                                                onChange={(e) => handleChange(e, 'firstName')}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter last name"
                                                value={userDetails?.lastName || ''}
                                                onChange={(e) => handleChange(e, 'lastName')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label className="labels">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={userDetails?.email || ''}
                                                onChange={(e) => handleChange(e, 'email')}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="labels">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter phone number"
                                                value={userDetails?.phoneNumber || ''}
                                                onChange={(e) => handleChange(e, 'phoneNumber')}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Gender</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={userDetails?.gender || ''}
                                                onChange={(e) => handleChange(e, 'gender')}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Role</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={userDetails?.role || ''}
                                                onChange={(e) => handleChange(e, 'role')}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AccountPage;
