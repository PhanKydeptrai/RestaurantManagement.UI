export interface OrderDto {
    orderId: string;
    tableId: string;
    paymentStatus: string;
    total: string;
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