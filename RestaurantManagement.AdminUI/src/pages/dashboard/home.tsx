import { useState } from "react";
import StatisticsByYearPage from "../statisic-page/statisticsbyyear";
import { Input, Button } from "antd";

const Home = () => {
    const [year, setYear] = useState<string>("");

    const handleSearch = () => {
        // Logic xử lý khi nhấn nút tìm kiếm
        console.log("Searching for year:", year);
    };

    return (
        <>
            <Input
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ width: 200, marginRight: 10 }}
            />
            <Button type="primary" onClick={handleSearch}>
                Search
            </Button>
            <StatisticsByYearPage year={year} />
        </>
    );
};

export default Home;