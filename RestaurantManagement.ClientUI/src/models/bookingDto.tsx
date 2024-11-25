
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