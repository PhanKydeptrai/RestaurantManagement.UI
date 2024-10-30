import { CustomerDto } from "../models/customerDto";
import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";

export const Customer = "customer";
export const sreachTerm = '';

export const GetAllCustomers = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    const res = await baseUrl.get<CustomerDto[]>(`${Customer}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
        //const res = await baseUrl.get<EmployeeDto[]>(`https://localhost:7057/api/employee?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetDetailCustomer = async (id: string) => {
    const res = await baseUrl.get<CustomerDto>(`${Customer}/${id}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}