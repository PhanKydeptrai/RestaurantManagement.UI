import axios, { AxiosResponse } from "axios";

const baseUrl = axios.create({
    baseURL: 'https://localhost:7057/api/', // Thay thế bằng URL gốc của API của bạn
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },

});

// /api/category
export const CreateCategory = async (formData: FormData) => {


    const res = await baseUrl.postForm(`/category`, formData)
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch((error) => {
            return error;
        });
}