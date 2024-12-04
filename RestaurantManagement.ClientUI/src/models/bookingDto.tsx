
export interface BookingDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bookingDate: string;
    bookingTime: string;
    numberOfCustomers: number;
    note: string;
}

export interface BookingDto2 {
    bookingDate: string;
    bookingTime: string;
    numberOfCustomer: number;
    note: string;
}
export interface BookDto {
    tableId: string;
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