import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetDetailMeal } from "../../services/meal-services";
import { Breadcrumb, Button, Col, Form, Input, message, Row } from "antd";

const DetailMealPage = () => {
    const { mealId } = useParams<{ mealId: string }>();
    const [meal, setMeal] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDetailMeal(mealId as string);
                console.log(result);
                setMeal(result);
            } catch (e) {
                message.error("Không thể tải thông tin món ăn!");
            }
        };
        fetchData();
    }, [mealId]);

    if (!meal) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                {/* Breadcrumb */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/dashboard"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/meals"><td>Meal</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Detail</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <div className="row">
                    {/* Image */}
                    <div className="col-12 col-md-4 d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className=" mt-5"
                                style={{ maxWidth: '100%', height: 'auto' }} // Đảm bảo hình ảnh tự động thay đổi kích thước theo màn hình
                                src={meal?.value.imageUrl || 'https://via.placeholder.com/300'}
                                alt={meal?.value.mealName || 'Meal Image'}
                            />
                        </div>
                    </div>

                    {/* Meal Details */}
                    <div className="col-12 col-md-8">
                        <div className="p-3 py-5">
                            <Form layout="vertical">
                                <Form.Item label="Meal Name">
                                    <Input value={meal?.value.mealName} />
                                </Form.Item>

                                <Form.Item label="Price">
                                    <Input value={meal?.value.price} />
                                </Form.Item>

                                <Form.Item label="Description">
                                    <Input.TextArea value={meal?.value.description} rows={4} />
                                </Form.Item>
                                <Form.Item label="Category">
                                    <Input value={meal?.value.categoryName} />
                                </Form.Item>

                                <div className="d-flex justify-content-between">
                                    <Button type="primary" onClick={() => window.history.back()}>
                                        Go Back
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailMealPage;
