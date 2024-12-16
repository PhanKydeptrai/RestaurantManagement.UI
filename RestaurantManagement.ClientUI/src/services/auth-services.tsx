import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import baseUrlPost from "../apis/basepost";


export const Account = "account";
export const Customner = "customer";
// /api/account/employee-login
export const CustomerLogin = async (loginString: string, passWord: string) => {
    //console.log(`${baseUrl}/${Account}/employee-login`);
    const res = await baseUrl.post(`${Account}/login`, { loginString, passWord })
        .then((response: AxiosResponse) => {
            console.log(response.data.value.token);
            // Lưu token vào sessionStorage
            sessionStorage.setItem('token', response.data.value.token);
            return response.data;
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


// /api/account/google-login/{token}
export const handleGoogleLogin = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    try {
        const res = await baseUrl.post(`${Account}/google-login/${token}`);
        // Lưu token vào sessionStorage
        sessionStorage.setItem('token', res.data.value.token);
        return res.data;
    }
    catch (error: any) {
        console.error('Login failed:', error);
        return error.response.data;
    }
};
// /api/account/facebook-login
export const handleFacebookLogin = async (userInfo: any) => {

    const email: string = userInfo.email;
    const userName: string = userInfo.name;
    const imageUrl: string = userInfo.picture.data.url;

    try {
        const res = await baseUrl.post(`${Account}/facebook-login`, { email, userName, imageUrl });
        // Lưu token vào sessionStorage
        sessionStorage.setItem('token', res.data.value.token);
        return res.data;
    }
    catch (error: any) {
        console.error('Login failed:', error.data);
        return error.response.data;
    }
};
export const UpdateAccountCus = async (formData: FormData, customerId: string) => {
    try {
        const res = await baseUrlPost.putForm(`${Customner}/${customerId}`, formData);
        console.log(res.data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}