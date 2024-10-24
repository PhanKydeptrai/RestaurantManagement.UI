import axios from "axios";

const baseUrlPost = axios.create({
    baseURL: 'https://localhost:7057/api/',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },

});

export default baseUrlPost;