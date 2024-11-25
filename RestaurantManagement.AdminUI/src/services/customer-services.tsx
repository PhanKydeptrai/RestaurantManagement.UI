import { CustomerDto } from "../models/customerDto";
import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import baseUrlDelete from "../apis/basedelete";

export const Customer = "customer";

export const GetAllCustomer = async (filterUserType: string, filterGender: string, filterStatus: string, searchTerm: string, page: number, pageSize: number, sortColumn: string, sortOrder: string) => {
    const res = await baseUrl.get<CustomerDto[]>(`${Customer}?filterUserType=${filterUserType}&filterGender=${filterGender}&filterStatus=${filterStatus}&searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetFilterTypeCus = async (filterUserType: string, page: number, pageIndex: number) => {
    const res = await baseUrl.get(`${Customer}?filterUserType=${filterUserType}&page=${page}&pageSize=${pageIndex}`)
        .then((response: AxiosResponse) => {
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetSreachCus = async (searchTerm: string, page: number, pageSize: number) => {
    const res = await baseUrl.get(`${Customer}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetCusGender = async (pageSize: number, pageIndex: number, filterGender: string) => {
    const res = await baseUrl.get<CustomerDto[]>(`${Customer}?filterGender=${filterGender}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetCusStatus = async (pageSize: number, pageIndex: number, filterStatus: string) => {
    const res = await baseUrl.get<CustomerDto[]>(`${Customer}?filterStatus=${filterStatus}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const DeleteCustomer = async (id: string) => {
    const res = await baseUrlDelete.delete(`${Customer}/${id}`);
    console.log(res.data);
    return res.data;
}
export const RestoreCustomer = async (id: string) => {
    const res = await baseUrlDelete.put(`${Customer}/restore/${id}`);
    console.log(res.data);
    return res.data;
}