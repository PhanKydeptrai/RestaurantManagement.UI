import { AxiosResponse } from 'axios';
import baseUrl from '../apis/base';
import { MealDto } from '../models/mealDto';
import { CategoryDto } from '../models/categoryDto';

export const Meal = "meal";
export const Category = "category";

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
export const GetAllCategory = async () => {
    const res = await baseUrl.get<CategoryDto[]>(`${Category}?category-info`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value)
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}