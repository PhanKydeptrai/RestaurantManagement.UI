import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Select } from "antd";
import { GetTableInfo } from "../../services/table-services";

export interface tableInfo {
    tableId: string;
    tableName: string;
}

const ArrangeBookPage = () => {
    const { BookingId } = useParams<{ BookingId: string }>();
    const [tableId, setTableId] = useState('');
    const [tableTypeName, setTableTypeName] = useState('');
    const [tableInfo, setTableInfo] = useState<tableInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetTableInfo();
                if (result) {
                    setTableInfo(result.value);
                }
            } catch (error) {
                console.error("Error fetching table info:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (value: string) => {
        const selectedTable = tableInfo.find(table => table.tableId === value);
        setTableId(value);
        setTableTypeName(selectedTable ? selectedTable.tableName : '');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            tableId: tableId,
            tableTypeName: tableTypeName
        };
        console.log('Data to be sent:', data);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await fetch(`https://localhost:7057/api/booking/table-arrange/${BookingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.text();
                try {
                    const errorJson = errorData ? JSON.parse(errorData) : {};
                    console.error('HTTP error! status:', response.status, 'Error data:', errorJson);
                } catch (err) {
                    console.error('Failed to parse error response:', err);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Success:', await response.json());
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="row mt-3">
                <div className="col-md-9 m-lg-3">
                    <label className="labels">Booking Id</label>
                    <input type="text" className="form-control" value={BookingId} readOnly />
                </div>

                <Form.Item>
                    <label>Select Table</label>
                    <Select value={tableId} onChange={handleSelectChange}>
                        <Select.Option value="">Select Table</Select.Option>
                        {tableInfo.map((table) => (
                            <Select.Option key={table.tableId} value={table.tableId}>
                                {table.tableName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ArrangeBookPage;