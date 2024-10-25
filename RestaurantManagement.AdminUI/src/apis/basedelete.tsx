import axios from "axios";

const baseUrlDelete = axios.create({
    baseURL: 'https://localhost:7057/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export default baseUrlDelete;