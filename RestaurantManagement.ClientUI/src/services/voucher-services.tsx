import { AxiosResponse } from 'axios';
import baseUrl from '../apis/base';
import { VoucherDto } from '../models/voucherDto';
export const Voucher = "voucher";

export const GetAllVoucher = async (filterStatus: string, filterType: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get<VoucherDto[]>(`${Voucher}?filterStatus=${filterStatus}&filterType=${filterType}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}