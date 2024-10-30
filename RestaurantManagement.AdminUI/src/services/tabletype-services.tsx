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
    return res.data;
}
export const DeleteTableType = async (tableTypeId: string) => {
    const res = await baseUrlDelete.delete(`${TableType}/${tableTypeId}`)
    return res.data;
}
