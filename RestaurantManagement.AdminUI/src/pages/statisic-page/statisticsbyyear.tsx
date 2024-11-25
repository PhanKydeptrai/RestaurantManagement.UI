import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { statisticsByYearResponses } from "../../models/statisticsDto2";
import { GetStatistics } from "../../services/statistics-services";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from "recharts";

const CustomizedLabel = (props: any) => {
    const { x, y, value } = props;
    return (
        <text x={x} y={y} dy={-10} textAnchor="middle" fill="#8884d8" fontSize={12}>
            {value}
        </text>
    );
};

const StatisticsByYearPage = ({ year }: { year: string }) => {
    const [statisticsByYearResponse, setStatisticsByYearResponse] = useState<statisticsByYearResponses | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (year) {
                    const result = await GetStatistics(year);
                    console.log(result); // Inspect the structure of the result
                    setStatisticsByYearResponse(result.value);
                } else {
                    console.log("Year is undefined");
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [year]);

    // Prepare chart data from the statisticsByMonthResponses
    const chartData = statisticsByYearResponse
        ? statisticsByYearResponse.statisticsByMonthResponses.map((item) => ({
            month: `Month ${item.month}`,  // Formatting the month label
            totalRevenue: item.totalRevenue
        }))
        : [];

    return (
        <>
            <h1>Statistics for the year {year}: </h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" name="Tháng" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="totalRevenue"
                        name="Biến động dòng tiền"
                        stroke="#8884d8"
                    >
                        <LabelList dataKey="totalRevenue" content={<CustomizedLabel />} />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default StatisticsByYearPage;