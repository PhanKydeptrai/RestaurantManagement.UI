import { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { HistoryOrderDto } from "../models/historyDto";

export const History = "history";

export const GetHistoryOrder = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/order?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetHistoryBooking = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/booking?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryEmp = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/employee?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryCustomer = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/customer?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryCategory = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/category?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryMeal = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/meal?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryTable = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/table?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryTableType = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/table-type?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetHistoryBill = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<HistoryOrderDto[]>(`${History}/bill?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
