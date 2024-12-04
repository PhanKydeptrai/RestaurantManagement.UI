import axios from "axios";

const baseUrlPost = axios.create({
    baseURL: 'https://localhost:7057/api/',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'

    },

});

export default baseUrlPost;