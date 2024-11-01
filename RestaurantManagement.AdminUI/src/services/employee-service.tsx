import { EmployeeDto } from "../models/employeeDto";
import { AxiosResponse } from "axios";
import baseUrl from "../apis/base";
import baseUrlPost from "../apis/basepost";
import baseUrlDelete from "../apis/basedelete";


export const Employee = "employee";

export const GetAllEmployee = async (filterGender: string, filterRole: string, filterStatus: string, sreachTerm: string, sortColumn: string, sortOrder: string, pageSize: number, pageIndex: number,) => {
    //console.log(`${baseUrl}/${Employee}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?filerGender=${filterGender}&filterRole=${filterRole}&filterStatus=${filterStatus}&sreachTerm=${sreachTerm}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${pageIndex}&pageSize=${pageSize}`)
        //const res = await baseUrl.get<EmployeeDto[]>(`https://localhost:7057/api/employee?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetEmp = async (pageSize: number, pageIndex: number) => {
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}


export const GetEmpSearch = async (pageSize: number, pageIndex: number, searchTerm: string) => {
    //console.log(`${baseUrl}/${Employee}?page=${pageIndex}&pageSize=${pageSize}`);
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?searchTerm=${searchTerm}&page=${pageIndex}&pageSize=${pageSize}`)
        //const res = await baseUrl.get<EmployeeDto[]>(`https://localhost:7057/api/employee?page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}


export const GetEmpStatus = async (pageSize: number, pageIndex: number, filterStatus: string) => {
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?filterStatus=${filterStatus}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const GetEmpRole = async (pageSize: number, pageIndex: number, filterRole: string) => {
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?filterRole=${filterRole}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}
export const GetEmpGender = async (pageSize: number, pageIndex: number, filterGender: string) => {
    const res = await baseUrl.get<EmployeeDto[]>(`${Employee}?filterGender=${filterGender}&page=${pageIndex}&pageSize=${pageSize}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
}

export const CreateEmployee = async (formData: FormData) => {
    try {
        const res = await baseUrlPost.postForm('/employee', formData);
        return res.data;
    }
    catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
    }
}
export const DeleteEmployee = async (id: string) => {
    const res = await baseUrlDelete.delete(`${Employee}/${id}`);
    return res.data;
}
export const GetDetailEmployee = async (employeeId: string) => {
    const res = await baseUrl.get<EmployeeDto>(`${Employee}/${employeeId}`);
    return res.data;
}

export const RestoreEmployee = async (id: string) => {
    const res = await baseUrlPost.put(`${Employee}/restore-employee/${id}`, null);
    return res.data;
}