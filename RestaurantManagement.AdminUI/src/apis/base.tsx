import axios from "axios";

const instance = axios.create({
    baseURL: "https://restaurantmanagement.azurewebsites.net/api/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json', //xác định nội dung nội dung của dữ liệu gửi đến json
        //'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F' // ko cho ai truy cập api của mình
    },
});

export default instance;