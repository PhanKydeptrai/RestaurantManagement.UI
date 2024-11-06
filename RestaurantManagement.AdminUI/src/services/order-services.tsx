import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";

export const Order = "orders";

export const GetOrderDetail = async (orderId: string) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Order}/${orderId}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching order by id:", error);
        return null;
    }
}

