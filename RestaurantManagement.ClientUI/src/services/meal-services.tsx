import { AxiosResponse } from 'axios';
import baseUrl from '../apis/base';
import { MealDto } from '../models/mealDto';

export const Meal = "meal";

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