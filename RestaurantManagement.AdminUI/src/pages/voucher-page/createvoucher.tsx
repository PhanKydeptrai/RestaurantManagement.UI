import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CreateVoucher } from "../../services/voucher-services";

const CreateVoucherPage = () => {

    const [voucherName, setVoucherName] = useState('');
    const [maxDiscount, setMaxDiscount] = useState(0);
    const [voucherCondition, setVoucherCondition] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ voucherName?: string, maxDiscount?: string, voucherCondition?: string, startDate?: string, expiredDate?: string, description?: string }>();
    const navigate = useNavigate();


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
        const newErrors: { voucherName?: string, maxDiscount?: string, voucherCondition?: string, startDate?: string, expiredDate?: string, description?: string } = {};

        if (voucherName === '') {
            newErrors.voucherName = 'Tên voucher không được để trống';
        }
        if (Number(maxDiscount) <= 0) {
            newErrors.maxDiscount = 'Giảm giá tối đa phải là số lớn hơn 0';
        }
        if (isNaN(maxDiscount)) {
            newErrors.maxDiscount = 'Giảm giá tối đa phải là số';
        }
        if (Number(voucherCondition) <= 0) {
            newErrors.voucherCondition = 'Điều kiện voucher phải là số lớn hơn 0';
        }
        if (isNaN(voucherCondition)) {
            newErrors.voucherCondition = 'Điều kiện voucher phải là số';
        }
        if (!startDate) {
            newErrors.startDate = 'Ngày bắt đầu không được để trống';
        }
        if (!expiredDate) {
            newErrors.expiredDate = 'Ngày hết hạn không được để trống';
        }
        if (description === '') {
            newErrors.description = 'Mô tả không được để trống';
        }
        if (new Date(startDate) > new Date(expiredDate)) {
            newErrors.startDate = 'Ngày bắt đầu phải nhỏ hơn ngày hết hạn';
            newErrors.expiredDate = 'Ngày hết hạn phải lớn hơn ngày bắt đầu';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validationForm()) {
            return;
        }
        const data = {
            voucherName: voucherName,
            maxDiscount: maxDiscount,
            voucherCondition: voucherCondition,
            startDate: startDate,
            expiredDate: expiredDate,
            description: description,
        };


        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await fetch('https://localhost:7057/api/voucher', {
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
            console.log('Success:', await response.json());
            notifySucess();
            setTimeout(() => {
                navigate('/vouchers');
            }, 2000);


        } catch (error) {
            console.error('Error:', error);
            notifyError();
        }
    }

    return (
        <>
            <main className="">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col ">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
                            <ol className="breadcrumb mb-0 ">
                                <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
                                <li className="breadcrumb-item"><Link to="/vouchers">Voucher</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="voucherName" className="form-label">Tên voucher</label>
                        <input type="text" className="form-control" id="voucherName" onChange={(e) => setVoucherName(e.target.value)} />
                        {errors?.voucherName && <div className="text-danger">{errors.voucherName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="maxDiscount" className="form-label">Giảm giá tối đa</label>
                        <input type="number" className="form-control" id="maxDiscount" onChange={(e) => setMaxDiscount(parseInt(e.target.value))} />
                        {errors?.maxDiscount && <div className="text-danger">{errors.maxDiscount}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="voucherCondition" className="form-label">Điều kiện voucher</label>
                        <input type="number" className="form-control" id="voucherCondition" onChange={(e) => setVoucherCondition(parseInt(e.target.value))} />
                        {errors?.voucherCondition && <div className="text-danger">{errors.voucherCondition}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Ngày bắt đầu</label>
                        <input type="date" className="form-control" id="startDate" onChange={(e) => setStartDate(e.target.value)} />
                        {errors?.startDate && <div className="text-danger">{errors.startDate}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiredDate" className="form-label">Ngày hết hạn</label>
                        <input type="date" className="form-control" id="expiredDate" onChange={(e) => setExpiredDate(e.target.value)} />
                        {errors?.expiredDate && <div className="text-danger">{errors.expiredDate}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Mô tả</label>
                        <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} />
                        {errors?.description && <div className="text-danger">{errors.description}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
            <ToastContainer />

        </>
    )
}

export default CreateVoucherPage;