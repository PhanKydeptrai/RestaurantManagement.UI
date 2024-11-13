export interface BillDto {
    userId: string;
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    tableId: string;
    billId: string;
    bookingId: string;
    bookingDate: string;
    bookingTime: string;
    orderId: string;
    totalPrice: string;
    paymentType: string;
    createdDate: string;
    orderDetails: OrderDetailDto[];
}
export interface OrderDetailDto {
    orderDetailId: string;
    mealId: string;
    mealName: string;
    imageUrl: string;
    quantity: number;
    unitPrice: string;
}