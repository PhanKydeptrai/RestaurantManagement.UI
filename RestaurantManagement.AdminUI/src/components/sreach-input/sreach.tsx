import React, { useState } from "react";
import { SearchCategory } from "../../services/category-service";

export const SreachComponent = () => {
    const [sreach, setSreach] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSreach(event.target.value);
    };
    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await SearchCategory(sreach);
            console.log(results);
        };
    }

    return (
        <>
            <div className="input-group">
                <span className="input-group-text"><i className="fa fa-search"></i></span>
                <input
                    className="form-control"
                    placeholder="Search by Category"
                    value={sreach}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                />
            </div>
        </>
    )
}
export default SreachComponent;