import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GetStatistic } from "../../services/statistics-services";
import { StatisticsByDayResponseDto, StatisticsByMonthResponseDto } from "../../models/statisticsDto";

interface ChartData {
    date: string;
    revenue: number;
}

const StatisticsPage = () => {
    const { year } = useParams<{ year: string }>();
    const [StatisticsByYearResponse, setStatisticsByYearResponse] = useState([]);
    const [statisticsByMonthResponse, setStatisticsByMonthResponse] = useState<StatisticsByMonthResponseDto[]>([]);
    const [statisticsByDayResponse, setStatisticsByDayResponse] = useState<StatisticsByDayResponseDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (year === '2024') {
                    const result = await GetStatistic(year);
                    console.log(result); // Inspect the structure of the result

                    // Assuming result has the correct structure based on your code
                    setStatisticsByMonthResponse(result?.statisticsByMonthResponses || []);
                } else {
                    console.log("Year is undefined");
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [year]);

    return (
        <>
            <h1>Statistics for the year {year}</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={StatisticsByYearResponse}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="currency" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default StatisticsPage;
