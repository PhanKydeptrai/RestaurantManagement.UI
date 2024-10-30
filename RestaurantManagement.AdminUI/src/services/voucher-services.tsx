import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { VoucherDto } from "../models/voucherDto";
import baseUrlDelete from "../apis/basedelete";

export const Voucher = "voucher";
export const sreachTerm = '';

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