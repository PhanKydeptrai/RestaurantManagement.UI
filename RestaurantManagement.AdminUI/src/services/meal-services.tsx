import { AxiosResponse } from 'axios';
import baseUrl from '../apis/base';
import { MealDto } from '../models/mealDto';
import baseUrlDelete from '../apis/basedelete';
import baseUrlPost from '../apis/basepost';

export const Meal = "meal";
export const sreachTerm = '';

export const GetAllMeals = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    //console.log(`${baseUrl}/${Category}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<MealDto[]>(`${Meal}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
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
export const GetMeal = async (page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetAllMeal = async (filterCategory: string, filterSellStatus: string, filterMealStatus: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?filterCategory=${filterCategory}&filterSellStatus=${filterSellStatus}&filterMealStatus=${filterMealStatus}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetDetailMeal = async (mealId: string) => {
    const res = await baseUrl.get<MealDto>(`${Meal}/${mealId}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const FilterSellStatus = async (filterSellStatus: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?filterSellStatus=${filterSellStatus}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const FilterCategory = async (filterCategory: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?filterCategory=${filterCategory}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const FilterMealStatus = async (filterMealStatus: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?filterMealStatus=${filterMealStatus}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const CreateMeal = async (formData: FormData) => {
    try {
        const res = await baseUrlPost.postForm(`${Meal}`, formData);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}

export const DeleteMeal = async (mealId: string) => {
    const res = await baseUrlDelete.delete(`${Meal}/${mealId}`);
    return res.data;
}
export const RestoresMeal = async (mealId: string) => {
    const res = await baseUrlDelete.put(`${Meal}/restore/${mealId}`);
    return res.data;
}

export const UpdateMeal = async (formData: FormData, mealId: string) => {
    try {
        const res = await baseUrlPost.putForm(`${Meal}/${mealId}`, formData);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}