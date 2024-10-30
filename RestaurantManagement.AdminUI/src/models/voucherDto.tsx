export interface VoucherDto {
    voucherId: string;
    voucherName: string;
    maxDiscount: number;
    voucherCondition: number;
    startDate: string;
    expiredDate: string;
    description: string;
    status: string;
    customerVouchers: string;
    bill: string;

}