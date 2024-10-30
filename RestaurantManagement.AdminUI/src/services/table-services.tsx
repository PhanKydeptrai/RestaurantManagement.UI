import { TableDto } from "../models/tableDto";
import baseUrl from "../apis/base";
import { Axios, AxiosResponse } from "axios";
import baseUrlDelete from "../apis/basedelete";
import baseUrlPost from "../apis/basepost";

export const Table = "table";
export const searchTerm = "";

export const GetAllTables = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    const res = await baseUrl.get<TableDto[]>(`${Table}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
};


export const DeleteTable = async (tableId: string) => {
    const res = await baseUrlDelete.delete(`${Table}/${tableId}`);
    return res.data;
}

