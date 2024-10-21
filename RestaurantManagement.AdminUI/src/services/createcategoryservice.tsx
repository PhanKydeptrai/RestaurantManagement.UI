import axios, { AxiosResponse } from "axios";

const baseUrl = axios.create({
    baseURL: 'https://localhost:7057/api/', 
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },

});

// /api/category
export const CreateCategory = async (formData: FormData) => {

        const res = await baseUrl.postForm('/category', formData);
        return res.data;
      
}

// export const CreateCategory = async (formData: FormData) => {
   
//       const token = sessionStorage.getItem('token');
//       const response = await fetch('https://localhost:7057/api/category', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });
  
//       const data = await response.json();
//       return data.isSuccess;
//   };