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