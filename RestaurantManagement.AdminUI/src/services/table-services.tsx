import { TableDto } from "../models/tableDto";
import baseUrl from "../apis/base";
import { Axios, AxiosResponse } from "axios";
import baseUrlDelete from "../apis/basedelete";
import baseUrlPost from "../apis/basepost";

export const Table = "table";
export const searchTerm = "";

export const GetAllTables = async (pageSize: number, pageIndex: number, sreachTerm: string) => {
    const res = await baseUrl.get<TableDto[]>(`${Table}?page=${pageIndex}&pageSize=${pageSize}&searchTerm=${sreachTerm}`)
        .then((response: AxiosResponse) => {
            console.log(response.data.value);
            return response.data.value;
        }).catch((error) => {
            console.log(error);
            return error;
        });
    return res;
};


export const DeleteTable = async (tableId: string) => {
    const res = await baseUrlDelete.delete(`${Table}/${tableId}`);
    return res.data;
}

export const RestoreTable = async (tableId: string) => {
    const res = await baseUrlDelete.put(`${Table}/${tableId}`);
    return res.data;
}

export const GetOrderDetail = async (tableId: string) => {
    try {
        const response: AxiosResponse = await baseUrl.get(`${Table}/${tableId}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching order by id:", error);
        return null;
    }
}

export const GetAllForOrder = async (filterTableType: string, filterActiveStatus: string, filterStatus: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    const res = await baseUrl.get(`${Table}?filterTableType=${filterTableType}&filterActiveStatus=${filterActiveStatus}&filterStatus=${filterStatus}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`);
    return res.data;
}

export const GetAllTableOfStatusEmpty = async (filterTableType: string, filterActiveStatus: string, filterStatus: string, sortColumn: string, sortOrder: string, page: number, pageSize: number) => {
    try {
        const res = await baseUrl.get(`${Table}?filterTableType=${filterTableType}&filterActiveStatus=${filterActiveStatus}&filterStatus=${filterStatus}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`);
        console.log(filterActiveStatus);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching table of status empty:", error);
        return null;
    }
}
export const AssignTableforbook = async (tableId: string) => {
    try {
        const res = await baseUrlDelete.put(`${Table}/table-assign/booked/${tableId}`)
        return res.data;
    } catch (error) {
        console.error("Error assigning table for customer:", error);
        return null;
    }
}
export const UnAssignTableforbook = async (tableId: string) => {
    try {
        const res = await baseUrlDelete.put(`${Table}/table-unassign/booked/${tableId}`)
        return res.data;
    } catch (error) {
        console.error("Error unassigning table for customer:", error);
        return null;
    }
}
export const AssignTableforCustomer = async (tableId: string) => {
    try {
        const res = await baseUrlDelete.put(`${Table}/table-assign/${tableId}`)
        return res.data;
    } catch (error) {
        console.error("Error assigning table for customer:", error);
        return null;
    }

}

export const UnAssignTableforCustomer = async (tableId: string) => {
    try {
        const res = await baseUrlDelete.put(`${Table}/table-unassign/${tableId}`)
        return res.data;
    } catch (error) {
        console.error("Error unassigning table for customer:", error);
        return null;
    }

}
