import { Axios, AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import { Arange, BookDto } from "../models/bookDto";
import baseUrlDelete from "../apis/basedelete";

export const Booking = "booking";

export const GetAllBooking = async (filterBookingStatus: string, filterPaymentStatus: string, searchTerm: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Booking}?filterBookingStatus=${filterBookingStatus}&filterPaymentStatus=${filterPaymentStatus}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`);
        console.log(response.data);

        // Ensure response.data.value is always an array
        return response.data.value.items || [];
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return []; // Return an empty array on error to avoid mapping issues
    }
};

export const GetBookingById = async (bookId: string) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Booking}/${bookId}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching booking by id:", error);
        return null;
    }
}

export const CreateArangeBooking = async (BookingId: string, arangebook: Arange) => {
    try {
        const response: AxiosResponse = await baseUrlDelete.post(`${Booking}/table-arrange/${BookingId}`, arangebook);
        console.log(response.data);
        return response.data;

    }
    catch (error) {
        console.error("Error creating arange booking:", error);
    }
}