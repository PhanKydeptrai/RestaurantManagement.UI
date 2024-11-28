import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";


export const Account = "account";

// /api/account/employee-login
export const CustomerLogin = async (loginString: string, passWord: string) => {
    //console.log(`${baseUrl}/${Account}/employee-login`);
    const res = await baseUrl.post(`${Account}/login`, { loginString, passWord })
        .then((response: AxiosResponse) => {
            console.log(response.data.value.token);
            // Lưu token vào sessionStorage
            sessionStorage.setItem('token', response.data.value.token);

        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
// /api/account/register
export const CustomerRegister = async (firstName: string, lastName: string, email: string, passWord: string, phone: string, gender: string) => {
    const res = await baseUrl.post(`${Account}/register`, { firstName, lastName, email, passWord, phone, gender })
        .then((response: AxiosResponse) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const VerifyEmail = async (email: string) => {
    const res = await baseUrl.post(`${Account}/verify-email`, { email })
        .then((response: AxiosResponse) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
// /api/account/customer-password
export const CustomerResetPassword = async (email: string) => {
    const res = await baseUrl.post(`${Account}/customer-password`, { email })
        .then((response: AxiosResponse) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
// /api/account/change-password
export const CustomerChangePassword = async (oldPassword: string, newPassword: string) => {
    const res = await baseUrl.post(`${Account}/change-password`, { oldPassword, newPassword })
        .then((response: AxiosResponse) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}