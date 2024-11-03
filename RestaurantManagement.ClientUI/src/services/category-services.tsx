import { CategoryDto } from "../models/categoryDto";
import baseUrl from "../apis/base";
import { AxiosResponse } from "axios";

export const Category = "category";


export const GetAllCategory = async (filter: string, searchTerm: string, sortColumn: string, sortOrder: string, pageSize: number, pageIndex: number) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?filter=${filter}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value)
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}
export const GetCategory = async (pageSize: number, pageIndex: number) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?page=${pageIndex}&pageSize=${pageSize}`)
        .then((reponse: AxiosResponse) => {
            console.log(reponse.data.value)
            return reponse.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}
export const GetCategoryFilter = async (pageSize: number, pageIndex: number, filter: string) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?filter=${filter}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}
export const GetCategorySearch = async (pageSize: number, pageIndex: number, searchTerm: string) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?searchTerm=${searchTerm}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value)
            return response.data.value
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}