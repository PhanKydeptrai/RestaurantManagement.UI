import { useEffect, useState } from "react";
import { MealDto } from "../../models/mealDto";
import { DeleteMeal, FilterCategory, FilterMealStatus, FilterSellStatus, GetAllMeal, GetAllMeals, RestoresMeal } from "../../services/meal-services";
import { Link } from "react-router-dom";
import { ContainerOutlined, DeleteOutlined, EditOutlined, FormOutlined, LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Pagination, Row, Col, Breadcrumb, Tag, notification, TableColumnsType, Modal } from "antd";
const { Option } = Select;

const MealPage = () => {
    const [meals, setMeals] = useState<MealDto[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSellStatus, setFilterSellStatus] = useState('');
    const [filterMealStatus, setFilterMealStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetAllMeal(filterCategory, filterSellStatus, filterMealStatus, searchTerm, '', '', pageIndex, pageSize);
            setMeals(result.items);
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.haspreviousPage);
            setTotalCount(result.totalCount);
        };
        fetchData();
    }, [pageIndex, pageSize]);

    //#region Filter

    const handleFilterMealStatus = async (value: string) => {
        const results = await FilterMealStatus(value, pageIndex, pageSize);
        setMeals(results.value.items);
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
    const handleSearchCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCategory(event.target.value);
    };
    const handleSearchCategorySubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const results = await FilterCategory(filterCategory, pageIndex, pageSize);
            setPageIndex(1);
            setMeals(results.items);
            setHasNextPage(results.hasNextPage);
            setHasPreviousPage(results.haspreviousPage);
            setTotalCount(results.totalCount);
        }
    }

    //#region Delete and Restore
    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có thực sự muốn xoá món không?',
            icon: <DeleteOutlined />,
            content: 'Chọn "Đồng ý" để xoá món ăn này. Chọn "Huỷ" để quay lại.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                setLoading(true);
                try {
                    const result = await DeleteMeal(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllMeals(pageSize, pageIndex, searchTerm);
                        setMeals(results.items);
                        notification.success({
                            message: 'Xoá thành công món ăn',
                            description: 'Món ăn đã được xoá thành công!',
                        });
                    } else {
                        notification.error({
                            message: 'Xoá thất bại món ăn',
                            description: 'Đã có lỗi xảy ra trong quá trình xoá món ăn!',
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Delete Failed',
                        description: 'There was an error while deleting the meal.',
                    });
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const handleRestore = async (id: string) => {
        Modal.confirm({
            title: 'Bạn có muốn khôi phục món này không?',
            icon: <RedoOutlined />,
            content: 'Chọn "Đồng ý" để khôi phục món ăn này. Chọn "Huỷ" để quay lại.',
            okText: 'Đồng ý',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: async () => {
                setLoading(true);
                try {
                    const result = await RestoresMeal(id);
                    if (result && result.isSuccess) {
                        const results = await GetAllMeals(pageSize, pageIndex, searchTerm);
                        setMeals(results.items);
                        notification.success({
                            message: 'Khôi phục món thành công',
                            description: 'Món ăn đã được khôi phục thành công!',
                        });
                    } else {
                        notification.error({
                            message: 'Khôi phục món thất bại',
                            description: 'Đã có lỗi xảy ra trong quá trình khôi phục món ăn!',
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: 'Restore Failed',
                        description: 'There was an error while restoring the meal.',
                    });
                } finally {
                    setLoading(false);
                }
            },
        });
    };
    //#endregion

    const columns: TableColumnsType<MealDto> = [
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
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Meal" style={{ width: 50, height: 50, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Actions', key: 'actions', fixed: 'right', render: (text: string, record: MealDto) => (
                <Space size="middle">
                    <Link to={`updatemeal/${record.mealId}`}><Button type="primary" icon={<EditOutlined />}>Update</Button></Link>
                    <Link to={`detailmeal/${record.mealId}`}><Button type="primary" icon={<ContainerOutlined />}>Detail</Button></Link>
                    {record.mealStatus === 'Active' ? (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.mealId)}>Delete</Button>
                    ) : (
                        <Button icon={<RedoOutlined />} style={{ backgroundColor: '#ffec3d', borderColor: '#ffec3d', color: 'white' }} onClick={() => handleRestore(record.mealId)}>Restore</Button>
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
                            <Link to="/">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Meal</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <div className="row mb-4">
                <div className="col-md-2">
                    <Link to="/createmeal">
                        <Button type="primary" icon={<FormOutlined />} block>Create</Button>
                    </Link>
                </div>
                <div className="col-md-2">
                    <Select defaultValue="" style={{ width: '100%' }} onChange={handleFilterMealStatus}>
                        <Option value="">All Meal Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>
                <div className="col-md-3">
                    <Input
                        placeholder="Search by Category"
                        value={filterCategory}
                        onChange={handleSearchCategoryChange}
                        onKeyDown={handleSearchCategorySubmit}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>
            </div>

            <Table
                bordered
                columns={columns}
                dataSource={meals}
                scroll={{ x: 'max-content' }}
                rowKey="mealId"
                pagination={false}
            />

            <Pagination
                current={pageIndex}
                total={totalCount}
                pageSize={pageSize}
                onChange={setPageIndex} // Cập nhật pageIndex khi người dùng thay đổi trang
                showSizeChanger={false}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                disabled={loading} // Vô hiệu hóa phân trang khi đang tải dữ liệu
                showQuickJumper={false}
                prevIcon={
                    hasPreviousPage ? (
                        <LeftOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang trước
                    ) : (
                        <LeftOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang trước
                    )
                }
                nextIcon={
                    hasNextPage ? (
                        <RightOutlined style={{ fontSize: 16, color: '#1890ff' }} /> // Hiển thị màu xanh nếu có trang tiếp theo
                    ) : (
                        <RightOutlined style={{ fontSize: 16, color: 'grey' }} /> // Hiển thị màu xám nếu không có trang tiếp theo
                    )
                }
            />

        </main>
    );
}

export default MealPage;
