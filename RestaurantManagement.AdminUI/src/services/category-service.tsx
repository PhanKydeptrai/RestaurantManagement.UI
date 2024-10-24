import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { CategoryDto } from "../models/categoryDto";

export const Category = "category";
export const sreachTerm = '';


export const GetAllCategories = async (pageSize: number, pageIndex: number) => {
    //console.log(`${baseUrl}/${Category}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?page=${pageIndex}&pageSize=${pageSize}`)
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

export const SearchCategory = async (searchTerm: string) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?searchTerm=${searchTerm}`)
        .then((response: AxiosResponse) => {
            const data = response.data.value.items;
            const find = data.filter((item) => item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(data);
            return find;
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

export const CreateCategory = async (formData: FormData) => {
    const res = await baseUrl.postForm('/category', formData);
    return res.data;
}