import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { CategoryDto } from "../models/categoryDto";

export const Category = "category";
export const sreachTerm = '';
// export const pageIndex = 1;
// export const pageSize = 8;

export const GetAllCategories = async (pageSize: number, pageIndex: number) => {
    //console.log(`${baseUrl}/${Category}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?page=${pageIndex}&pageSize=${pageSize}`)
        //const res = await baseUrl.get<CategoryDto[]>(`https://localhost:7057/api/category?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value.items);
            return response.data.value.items;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

// export const SearchCategory = async (searchTerm = '') => {
//     const url = `${baseUrl}/${Category}?seachTerm=${searchTerm}&page=${pageIndex}&pageSize=${pageSize}`;
//     // const res = await baseUrl.get<CategoryDto[]>(`${Category}?seachTerm=${searchTerm}&page=${pageIndex}&pageSize=${pageSize}`)
//     try {
//         const response = await axios.get<{ values: { items: CategoryDto[] } }>(url);
//         console.log(response.data.values.items);
//         return response.data.values.items;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

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

