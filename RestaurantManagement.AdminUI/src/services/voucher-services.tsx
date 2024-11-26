import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { VoucherDto } from "../models/voucherDto";
import baseUrlDelete from "../apis/basedelete";
import baseUrlPost from "../apis/basepost";
import { OrderDto } from "../models/orderDto";

export const Voucher = "voucher";
export const sreachTerm = '';
export const Order = "orders";

export const GetAllVouchers = async (pageSize: number, pageIndex: number, searchTerm: string) => {
    const res = await baseUrl.get<VoucherDto[]>(`${Voucher}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}


export const DeleteVoucher = async (voucherId: string) => {
    const res = await baseUrlDelete.delete(`${Voucher}/${voucherId}`)
    return res;
}
export const CreateVoucher = async (voucher: VoucherDto) => {
    try {
        const res = await baseUrlPost.post(`${Voucher}`, voucher)
        return res;
    }
    catch (error) {
        console.log(error);
    }

}
export const MakeVoucher = async (tableId: string, voucherData: any) => {
    try {
        const res = await baseUrlDelete.put(`${Order}/make-payment/${tableId}`, voucherData)
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const MakePayment = async (tableId: string) => {
    const res = await baseUrl.get<OrderDto>(`${Order}/make-payment-information/${tableId}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
