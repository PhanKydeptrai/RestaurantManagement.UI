export interface StatisticsByYearResponse {
    year: number;
    totalRevenue: number;
    currency: string;
    statisticsByMonthResponses: StatisticsByMonthResponseDto[];
}

export interface StatisticsByMonthResponseDto {
    date: number;
    totalRevenue: number;
    statisticsByDayResponses: StatisticsByDayResponseDto[];
}

export interface StatisticsByDayResponseDto {
    date: number;
    totalRevenue: number;
}