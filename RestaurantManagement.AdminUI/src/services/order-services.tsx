import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import baseUrlPost from "../apis/basepost";
import baseUrlDelete from "../apis/basedelete";

export const Order = "orders";
export const Table = "table";

export const ChangeTable = async (tableId: string, data: { newTableId: string, note: string }) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.put(`${Table}/change-table/${tableId}`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error changing table:", error);
        throw error;
    }
};

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
export const GetOrderSearchTable = async (pageSize: number, pageIndex: number, filterTableId: string) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Order}?filterTableId=${filterTableId}&page=${pageIndex}&pageSize=${pageSize}`);
        console.log(response.data.value);
        return response.data.value;
    } catch (error) {
        console.error("Error fetching order by search term:", error);
        return null;
    }
}
export const GetPaymentStatus = async (filterPaymentStatus: string, pageSize: number, pageIndex: number) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Order}?filterPaymentStatus=${filterPaymentStatus}&page=${pageIndex}&pageSize=${pageSize}`);
        console.log(response.data.value);
        return response.data.value;
    } catch (error) {
        console.error("Error fetching order by payment status:", error);
        return null;
    }
}
export const GetAllOrders = async (filterUserId: string, filterTableId: string, filterPaymentStatus: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Order}?filterUserId=${filterUserId}&filterTableId=${filterTableId}&filterPaymentStatus=${filterPaymentStatus}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`);
        console.log(response.data.value);
        return response.data.value;
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
}
export const CreateOrder = async (order: any, tableId: string) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.post(`${Order}/${tableId}`, order);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        return null;
    }
}

export const UpdateOrder = async (orderDetailId: string, quantity: number) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.put(`${Order}/${orderDetailId}`, { quantity });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error updating order:", error);
        return null;
    }
}

export const DeleteOrder = async (orderDetailId: string) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.delete(`${Order}/${orderDetailId}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting order:", error);
        return null;
    }

}

export const OrderPayCash = async (tableId: string) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.put(`${Order}/pay/${tableId}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error paying order:", error);
        return null;
    }
}
export const OrderPayVNPay = async (tableId: string) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.get(`${Order}/vn-pay/${tableId}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error paying order:", error);
        return null;
    }
}