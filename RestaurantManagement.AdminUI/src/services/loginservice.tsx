import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";


export const Account = "account";

// /api/account/employee-login
export const EmployeeLogin = async (loginString: string, passWord: string) => {
    
    //console.log(`${baseUrl}/${Account}/employee-login`);
    const res = await baseUrl.post(`${Account}/employee-login`, {loginString, passWord})
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            // Lưu token vào sessionStorage
            sessionStorage.setItem('token', response.data.value);
            
        }).catch((error) => {
            console.log(error);
            return error;
        });
    
}