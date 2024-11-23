
export interface statisticsByYearResponses {
    year: number;
    currency: string;
    statisticsByMonthResponses: statisticsByMonthResponseDto[];

}

export interface statisticsByMonthResponseDto {
    month: number;
    totalRevenue: number;
}