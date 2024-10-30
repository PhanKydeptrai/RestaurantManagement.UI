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

export const CreateMeal = async (formData: FormData) => {
    const res = await baseUrlPost.postForm(`${Meal}`, formData);
    return res.data;
}

export const DeleteMeal = async (mealId: string) => {
    const res = await baseUrlDelete.delete(`${Meal}/${mealId}`);
    return res.data;
}
export const RestoresMeal = async (mealId: string) => {
    const res = await baseUrlDelete.put(`${Meal}/restore/${mealId}`);
    return res.data;
}