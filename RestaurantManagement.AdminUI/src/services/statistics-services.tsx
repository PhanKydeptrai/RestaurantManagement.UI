import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { StatisticsByYearResponse } from "../models/statisticsDto";

export const Orders = "orders";

export const GetStatistic = async (year: string) => {
    const res = await baseUrl.get<StatisticsByYearResponse[]>(`${Orders}/statistics/${year}`)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}