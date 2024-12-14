import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { CategoryDto } from "../models/categoryDto";
import baseUrlPost from "../apis/basepost";
import baseUrlDelete from "../apis/basedelete";

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
export const SortCategory = async (pageSize: number, pageIndex: number, sortColumn: string, sortOrder: string) => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetAllCategories = async (pageSize: number, pageIndex: number, searchTerm: string) => {
    //console.log(`${baseUrl}/${Category}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
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
//https://localhost:7057/api/category/category-info
export const GetCategoryInfo = async () => {
    const res = await baseUrl.get(`${Category}/category-info`)
        .then((response: AxiosResponse) => {
            return response.data.value;
        }).catch((error) => {
            console.log(error)
            return error;
        });
    return res;
}

export const GetDetailCategory = async (categoryId: string) => {
    const res = await baseUrl.get<CategoryDto>(`${Category}/${categoryId}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const UpdateCategory = async (categoryId: string, formData: FormData) => {
    try {
        const res = await baseUrlPost.putForm(`${Category}/${categoryId}`, formData);
        console.log(res.data);
        return res.data;
    }
    catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}

export const CreateCategory = async (formData: FormData) => {

    try {
        const res = await baseUrlPost.postForm('/category', formData);
        console.log(sessionStorage.getItem('token'));
        return res.data;
    }
    catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }

}

export const DeleteCategory = async (categoryId: string) => {
    const res = await baseUrlDelete.delete(`${Category}/${categoryId}`);
    return res.data;
}
export const RestoreCategory = async (categoryId: string) => {
    const res = await baseUrlDelete.put(`${Category}/restore/${categoryId}`);
    return res.data;
}