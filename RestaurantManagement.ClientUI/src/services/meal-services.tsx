import { MealDto } from '../models/mealDto';
import baseUrl from '../apis/base';
import { AxiosResponse } from 'axios';

export const Meal = "meal";

export const GetAllMeal = async (filterCategory: string, filterSellStatus: string, filterMealStatus: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<MealDto[]>(`${Meal}?filterCategory=${filterCategory}&filterSellStatus=${filterSellStatus}&filterMealStatus=${filterMealStatus}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}