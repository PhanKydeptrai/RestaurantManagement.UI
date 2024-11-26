import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";


export const Account = "account";

// /api/account/employee-login
export const EmployeeLogin = async (loginString: string, passWord: string) => {

    //console.log(`${baseUrl}/${Account}/employee-login`);
    const res = await baseUrl.post(`${Account}/employee-login`, { loginString, passWord })
        .then((response: AxiosResponse) => {
            console.log(response.data.value.token);
            console.log(response.data.value.role);
            // Lưu token vào sessionStorage

            sessionStorage.setItem('token', response.data.value.token);
            localStorage.setItem('role', response.data.value.role);
            return response.data;

        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}