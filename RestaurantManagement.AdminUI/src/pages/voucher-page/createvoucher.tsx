import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CreateVoucher } from "../../services/voucher-services";
import { Form, Input, notification, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;
const CreateVoucherPage = () => {

    const [voucherName, setVoucherName] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [percentageDiscount, setPercentageDiscount] = useState(0);
    const [maximumDiscountAmount, setMaximumDiscountAmount] = useState(0);
    const [minimumOrderAmount, setMinimumOrderAmount] = useState(0);
    const [voucherCondition, setVoucherCondition] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState<{ voucherName?: string, maxDiscount?: string, voucherCondition?: string, startDate?: string, expiredDate?: string, description?: string, voucherCode?: string, percentageDiscount?: string, minOrderAmount?: string }>();
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
        const newErrors: { voucherName?: string, maxDiscount?: string, voucherCondition?: string, startDate?: string, expiredDate?: string, description?: string, voucherCode?: string, percentageDiscount?: string, minOrderAmount?: string } = {};

        if (voucherName === '') {
            newErrors.voucherName = 'Tên voucher không được để trống';
        }
        if (Number(maximumDiscountAmount) <= 0) {
            newErrors.maxDiscount = 'Giảm giá tối đa phải là số lớn hơn 0';
        }
        if (isNaN(maximumDiscountAmount)) {
            newErrors.maxDiscount = 'Giảm giá tối đa phải là số';
        }
        if (voucherCode === '') {
            newErrors.voucherCode = 'Mã voucher không được để trống';
        }
        if (percentageDiscount <= 0) {
            newErrors.percentageDiscount = 'Giảm giá phải là số lớn hơn 0';
        }
        if (isNaN(percentageDiscount)) {
            newErrors.percentageDiscount = 'Giảm giá phải là số';
        }
        if (Number(minimumOrderAmount) <= 0) {
            newErrors.minOrderAmount = 'Số tiền tối thiểu phải là số lớn hơn 0';
        }
        if (isNaN(minimumOrderAmount)) {
            newErrors.minOrderAmount = 'Số tiền tối thiểu phải là số';
        }

        // if (Number(voucherCondition) <= 0) {
        //     newErrors.voucherCondition = 'Điều kiện voucher phải là số lớn hơn 0';
        // }
        // if (isNaN(voucherCondition)) {
        //     newErrors.voucherCondition = 'Điều kiện voucher phải là số';
        // }
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
            notifyError();
            return;
        }
        const data = {
            voucherName: voucherName,
            voucherCode: voucherCode,
            percentageDiscount: percentageDiscount,
            maximumDiscountAmount: maximumDiscountAmount,
            minimumOrderAmount: minimumOrderAmount,
            voucherConditions: voucherCondition,
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
            const response = await fetch('https://restaurantmanagement.azurewebsites.net/api/voucher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('HTTP error! status:', response.status, 'Error data:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Success:', await response.json());
            notification.success({
                message: 'Thành công',
                description: 'Thêm voucher thành công!'
            })
            setTimeout(() => {
                navigate('/vouchers');
            }, 2000);


        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Thất bại',
                description: 'Thêm voucher thất bại! Vui lòng kiểm tra lại các thông tin cần thiết.'
            });
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
                                <li className="breadcrumb-item"><Link to="/vouchers">Voucher</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Form.Item label="Tên voucher" validateStatus={errors?.voucherName ? 'error' : 'success'} help={errors?.voucherName}>
                            <Input type="text" placeholder="Tên voucher" value={voucherName} onChange={(e) => setVoucherName(e.target.value)} />
                        </Form.Item>
                        {errors?.voucherName && <div className="text-danger">{errors.voucherName}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Mã Voucher" validateStatus={errors?.voucherCode ? 'error' : 'success'} help={errors?.voucherCode}>
                            <Input
                                type="text"
                                placeholder="Mã Voucher"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                            />
                        </Form.Item>
                        {errors?.voucherCode && <div className="text-danger">{errors.voucherCode}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Giảm giá %" validateStatus={errors?.percentageDiscount ? 'error' : 'success'} help={errors?.percentageDiscount}>
                            <Input
                                type="number"
                                placeholder="Giảm giá %"
                                value={percentageDiscount}
                                onChange={(e) => setPercentageDiscount(parseInt(e.target.value))}
                            />
                        </Form.Item>
                        {errors?.percentageDiscount && <div className="text-danger">{errors.percentageDiscount}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Giảm giá tối đa" validateStatus={errors?.maxDiscount ? 'error' : 'success'} help={errors?.maxDiscount}>
                            <Input
                                type="number"
                                placeholder="Giảm giá tối đa"
                                value={maximumDiscountAmount}
                                onChange={(e) => setMaximumDiscountAmount(parseInt(e.target.value))}
                            />
                        </Form.Item>
                        {errors?.maxDiscount && <div className="text-danger">{errors.maxDiscount}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Số tiền tối thiểu" validateStatus={errors?.minOrderAmount ? 'error' : 'success'} help={errors?.minOrderAmount}>
                            <Input
                                type="number"
                                placeholder="Số tiền tối thiểu"
                                value={minimumOrderAmount}
                                onChange={(e) => setMinimumOrderAmount(parseInt(e.target.value))}
                            />
                        </Form.Item>
                        {errors?.minOrderAmount && <div className="text-danger">{errors.minOrderAmount}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Điều kiện voucher" validateStatus={errors?.voucherCondition ? 'error' : 'success'} help={errors?.voucherCondition}>
                            <Input
                                type="number"
                                placeholder="Điều kiện voucher"
                                value={voucherCondition}
                                onChange={(e) => setVoucherCondition(parseInt(e.target.value))}
                            />
                        </Form.Item>
                        {/* {errors?.voucherCondition && <div className="text-danger">{errors.voucherCondition}</div>} */}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Ngày bắt đầu" validateStatus={errors?.startDate ? 'error' : 'success'} help={errors?.startDate}>
                            <Input
                                type="date"
                                placeholder="Ngày bắt đầu"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Item>
                        {errors?.startDate && <div className="text-danger">{errors.startDate}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Ngày hết hạn" validateStatus={errors?.expiredDate ? 'error' : 'success'} help={errors?.expiredDate}>
                            <Input
                                type="date"
                                placeholder="Ngày hết hạn"
                                value={expiredDate}
                                onChange={(e) => setExpiredDate(e.target.value)}
                            />
                        </Form.Item>
                        {errors?.expiredDate && <div className="text-danger">{errors.expiredDate}</div>}
                    </div>
                    <div className="mb-3">
                        <Form.Item label="Mô tả" validateStatus={errors?.description ? 'error' : 'success'} help={errors?.description}>
                            <TextArea
                                placeholder="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </Form.Item>

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