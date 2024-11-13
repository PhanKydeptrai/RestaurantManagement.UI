import { AxiosResponse } from "axios";
import baseUrlDelete from "../apis/basedelete";
import baseUrlPost from "../apis/basepost";

export const Account = "account";
export const Employee = "employee";
// /api/account/change-password
// Đảm bảo gửi đúng tên trường: "oldPass" và "newPass"
export const EmployeeChangePassword = async (oldPassword: string, newPassword: string) => {
    const res = await baseUrlDelete.post(`${Account}/change-password`, {
        oldPass: oldPassword, // Đổi tên trường thành "oldPass"
        newPass: newPassword, // Đổi tên trường thành "newPass"
    })
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data; // Đảm bảo trả về dữ liệu
        })
        .catch((error) => {
            console.log(error);
            return error.response?.data || error; // Lấy dữ liệu lỗi nếu có
        });

    return res;
}

export const UpdateAccountEmp = async (formData: FormData, employeeId: string) => {
    try {
        const res = await baseUrlPost.putForm(`${Employee}/${employeeId}`, formData);
        console.log(res.data);
        return res.data;
    }
    catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}