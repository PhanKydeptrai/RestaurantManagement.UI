import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { CategoryDto } from "../models/categoryDto";
import baseUrlPost from "../apis/basepost";
import baseUrlDelete from "../apis/basedelete";

export const Category = "category";
export const sreachTerm = '';


export const GetAllCategories = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    //console.log(`${baseUrl}/${Category}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
        //const res = await baseUrl.get<CategoryDto[]>(`https://localhost:7057/api/category?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const SreachForStatus = async (sreachTerm: string) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?searchTerm=${sreachTerm}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value.items);
            return response.data.value.items;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetCategoryById = async (id: string) => {
    const res = await baseUrl.get<CategoryDto>(`${Category}/${id}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value.items);
            return response.data.value.items;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const UpdateCategory = async (categoryId: string, formData: FormData) => {
    const res = await baseUrlPost.putForm(`${Category}/${categoryId}`, formData);
    console.log(res.data);
    console.log(`${Category}/${categoryId}`);
    return res.data;
}

export const CreateCategory = async (formData: FormData) => {
    const res = await baseUrlPost.postForm('/category', formData);
    return res.data;
}
export const DeleteCategory = async (categoryId: string) => {
    const res = await baseUrlDelete.delete(`${Category}/${categoryId}`);
    return res.data;
}