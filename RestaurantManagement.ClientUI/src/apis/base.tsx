import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7057/api/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'

    },
});

export default instance;