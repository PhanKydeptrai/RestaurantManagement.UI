
import baseUrl from "../apis/base";
import { AxiosResponse } from "axios";
import baseUrlDelete from "../apis/basedelete";
import { BookDto, BookingDto, BookingDto2 } from "../models/bookingDto";

export const Booking = "booking";

export const GetAllBooking = async (filter: string, searchTerm: string, sortColumn: string, sortOrder: string, pageSize: number, pageIndex: number) => {
    const res = await baseUrl.get<BookDto[]>(`${Booking}?filter=${filter}&searchTerm=${searchTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value)
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}

export const GetBookingById = async (id: string) => {
    const res = await baseUrl.get<BookingDto>(`${Booking}/${id}`)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}

export const CreateBooking = async (booking: BookingDto) => {
    const res = await baseUrl.post<BookingDto>(`${Booking}`, booking)
        .then((response: AxiosResponse) => {
            console.log('this is: ', response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}

export const BookingSubcribe = async (booking: BookingDto2) => {
    const res = await baseUrlDelete.post<BookingDto2>(`${Booking}/subcriber`, booking)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    return res;
}

