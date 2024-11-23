import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { TableTypeDto } from "../models/tabletypeDto";
import baseUrlPost from "../apis/basepost";
import baseUrlDelete from "../apis/basedelete";

export const TableType = "tabletype";
export const sreachTerm = '';

export const GetAllTableTypes = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    const res = await baseUrl.get<TableTypeDto[]>(`${TableType}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetAllTableType = async (searchTerm: string, filterStatus: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get(`${TableType}?searchTerm=${searchTerm}&filterStatus=${filterStatus}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetTableTypeInfo = async () => {
    const res = await baseUrl.get(`${TableType}/tabletype-info`)
        .then((response: AxiosResponse) => {
            return response.data.value;
        }).catch((error) => {
            console.log(error)
            return error;
        });
    return res;
}

export const CreateTableType = async (formData: FormData) => {
    const res = await baseUrlPost.postForm(`${TableType}`, formData)
    console.log(res);
    return res.data;
}
export const DeleteTableType = async (tableTypeId: string) => {
    const res = await baseUrlDelete.delete(`${TableType}/${tableTypeId}`)
    console.log(res.data);
    return res.data;
}

export const RestoreTableType = async (tableTypeId: string) => {
    const res = await baseUrlDelete.put(`${TableType}/restore/${tableTypeId}`)
    console.log(res.data);
    return res.data;
}
export const UpdateTableType = async (tableTypeId: string, formData: FormData) => {
    try {
        const res = await baseUrlPost.putForm(`${TableType}/${tableTypeId}`, formData);
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }

}
