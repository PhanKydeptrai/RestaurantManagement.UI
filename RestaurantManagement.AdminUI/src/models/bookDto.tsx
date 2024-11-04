export interface BookDto {
    bookId: string;
    userId: string;
    bookingPrice: string;
    paymentStatus: string;
    bookingStatus: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bookingDate: string;
    bookingTime: string;
    numberOfCustomer: number;
    note: string;
}

export interface Arange {
    bookingId: string;
    tableId: string;
    tableTypeName: string;
}