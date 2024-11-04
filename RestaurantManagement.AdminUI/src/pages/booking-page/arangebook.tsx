import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateArangeBooking } from "../../services/book-services";

interface tableInfo {
    tableId: string;
    tableName: string;
}

const ArrangeBookPage = () => {

    const { BookingId } = useParams<{ BookingId: string }>();
    const [tableId, setTableId] = useState('');
    const [tableTypeName, setTableTypeName] = useState('');

    const [tableInfo, setTableInfo] = useState<tableInfo[]>([]);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/booking/${BookingId}`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        }; fetchBookData();
    }, [BookingId]);
    useEffect(() => {
        fetch(`https://localhost:7057/api/table/table-info`)
            .then(reponse => reponse.json())
            .then(data => setTableInfo(data.value))
            .catch(error => console.error('Error:', error));
        console.log(tableInfo);
    }, []);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTable = tableInfo.find(table => table.tableId === event.target.value);
        setTableId(event.target.value);
        setTableTypeName(selectedTable ? selectedTable.tableName : '');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
                const errorData = await response.json();
                console.error('HTTP error! status:', response.status, 'Error data:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Success:', await response.json());
            return;
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
                <div className="col-md-9 m-lg-3">
                    <label htmlFor="tableTypeId">Table Type</label>
                    <select className="form-select" id="tableTypeId" value={tableId} onChange={handleSelectChange}>
                        <option value="">Select Table Type</option>
                        {Array.isArray(tableInfo) && tableInfo.map((table: tableInfo) => (
                            <option key={table.tableId} value={table.tableId}>{table.tableName}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ArrangeBookPage;