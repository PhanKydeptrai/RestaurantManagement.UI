import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import baseUrlDelete from "../apis/basedelete";


export const Bill = "bill";

export const GetAllBill = async (filterUserId: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get(`${Bill}?filterUserId=${filterUserId}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }
        ).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetBillDetail = async (billId: string) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Bill}/${billId}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching bill detail:", error);
        return [];
    }
}

export const ExportBill = async (billId: string) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.get(`${Bill}/bill-export/${billId}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error exporting bill:", error);
        return [];

    }
}