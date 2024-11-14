import { useEffect, useState } from "react";
import { MealDto } from "../../models/mealDto";
import { GetAllMeal } from "../../services/meal-services";
import { Breadcrumb, Button, Col, Input, Pagination, Row, Select, Space, Card, Tag } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const MenuPage = () => {
    const [meals, setMeals] = useState<MealDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(8); // Setting page size to 8
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSellStatus, setFilterSellStatus] = useState('');
    const [filterMealStatus, setFilterMealStatus] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setMeals(result.value.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize]);

    const handleFilterCategory = async (value: string) => {
        const results = await GetAllMeal(value, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
        setMeals(results.items);
        setFilterCategory(value);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    const handleFilterSellStatus = async (value: string) => {
        const results = await GetAllMeal(filterCategory, value, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
        setMeals(results.items);
        setFilterSellStatus(value);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    const handleFilterMealStatus = async (value: string) => {
        const results = await GetAllMeal(filterCategory, filterSellStatus, value, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
        setMeals(results.items);
        setFilterMealStatus(value);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, sortColumn, sortOrder, pageIndex, pageSize);
            setPageIndex(1);
            setMeals(results.value);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
    };

    return (
        <main className="container">

            <Row gutter={[16, 16]}>
                {meals.map((meal) => (
                    <Col span={8} key={meal.mealId}>
                        <Card
                            hoverable
                            cover={<img alt={meal.mealName} src={meal.imageUrl} />}

                        >
                            <Card.Meta
                                title={meal.mealName}
                                description={
                                    <>
                                        <div>Category: {meal.categoryName}</div>
                                        <div>Price: {meal.price}</div>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={setPageIndex}
                showSizeChanger={false}
                showQuickJumper={true}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
        </main>
    );
}

export default MenuPage;