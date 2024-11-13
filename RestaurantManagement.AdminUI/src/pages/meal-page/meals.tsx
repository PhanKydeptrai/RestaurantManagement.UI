import { useEffect, useState } from "react";
import { MealDto } from "../../models/mealDto";
import { DeleteMeal, GetAllMeals, RestoresMeal } from "../../services/meal-services";
import { Link } from "react-router-dom";
import { Button, Input, Select, Space, Table, Pagination, Row, Col, Breadcrumb, Tag } from "antd";
const { Option } = Select;

const MealPage = () => {
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
            const result = await GetAllMeals(pageSize, pageIndex, searchTerm);
            setMeals(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize, searchTerm]);

    //#region Pagination
    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPageIndex(pageIndex + 1);
        }
    };
    //#endregion

    //#region Filter
    const handleFilterSellStatus = async (value: string) => {
        const results = await GetAllMeals(pageSize, pageIndex, value);
        setMeals(results.items);
        setFilterSellStatus(value);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };

    const handleFilterMealStatus = async (value: string) => {
        const results = await GetAllMeals(pageSize, pageIndex, value);
        setMeals(results.items);
        setFilterMealStatus(value);
        setPageIndex(1);
        setHasNextPage(results.hasNextPage);
        setHasPreviousPage(results.haspreviousPage);
        setTotalCount(results.totalCount);
    };
    //#endregion

    //#region Search
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await GetAllMeals(pageSize, pageIndex, searchTerm);
            setPageIndex(1);
            setMeals(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
    };
    //#endregion

    //#region Delete and Restore
    const handleDelete = async (id: string) => {
        try {
            await DeleteMeal(id);
            const results = await GetAllMeals(pageSize, pageIndex, searchTerm);
            setMeals(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.error('Failed to delete meal:', error);
        }
    };

    const handleRestore = async (id: string) => {
        try {
            await RestoresMeal(id);
            const results = await GetAllMeals(pageSize, pageIndex, searchTerm);
            setMeals(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        } catch (error) {
            console.error('Failed to restore meal:', error);
        }
    };
    //#endregion

    const columns = [
        { title: 'Meal Name', dataIndex: 'mealName', key: 'mealName' },
        { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Status', dataIndex: 'mealStatus', key: 'mealStatus',
            render: (mealStatus: string) => (
                <Tag color={mealStatus === 'Active' ? 'green' : 'red'}>{mealStatus}</Tag>
            ),
        },
        {
            title: 'Image', dataIndex: 'imageUrl', key: 'imageUrl',
            render: (imageUrl: string) => {
                console.log(imageUrl); // Kiểm tra xem URL có đúng không
                return <img src={imageUrl} alt="Meal" style={{ width: 50, height: 50, objectFit: 'cover' }} />;
            }
        },
        {
            title: 'Actions', key: 'actions', render: (text: string, record: MealDto) => (
                <Space size="middle">
                    <Link to={`updatemeal/${record.mealId}`}><Button type="primary">Update</Button></Link>
                    <Link to={`detailmeal/${record.mealId}`}><Button type="primary">Detail</Button></Link>
                    {record.mealStatus === 'Active' ? (
                        <Button type="primary" danger onClick={() => handleDelete(record.mealId)}>Delete</Button>
                    ) : (
                        <Button style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.mealId)}>Restore</Button>
                    )}
                </Space>
            )
        },
    ];

    return (
        <main className="container">
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Meal</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <div className="row mb-4">
                <div className="col-md-2">
                    <Link to="/createmeal"><Button type="primary" block>Create</Button></Link>
                </div>
                <div className="col-md-2">
                    <Select defaultValue="" style={{ width: '100%' }} onChange={handleFilterSellStatus}>
                        <Option value="">All Sell Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>
                <div className="col-md-2">
                    <Select defaultValue="" style={{ width: '100%' }} onChange={handleFilterMealStatus}>
                        <Option value="">All Meal Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>
                <div className="col-md-4">
                    <Input
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={meals}
                rowKey="mealId"
                pagination={false}
            />

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
export default MealPage;
