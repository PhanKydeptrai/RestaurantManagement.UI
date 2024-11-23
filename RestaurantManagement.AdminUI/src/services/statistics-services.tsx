import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { StatisticsByYearResponse } from "../models/statisticsDto";
import { statisticsByYearResponses } from "../models/statisticsDto2";

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

export const GetStatistics = async (year: string) => {
    const res = await baseUrl.get<statisticsByYearResponses[]>(`${Orders}/statistics/year/${year}`)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}