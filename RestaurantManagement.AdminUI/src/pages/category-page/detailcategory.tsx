import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Row, Col, Image, Breadcrumb } from "antd";
import { GetDetailCategory } from "../../services/category-service";

const DetailCategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>(); // Lấy id từ url
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDetailCategory(categoryId as string);
                console.log(result);
                setCategory(result);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [categoryId]);

    return (
        <>
            <form className="form-container">
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><td>Dashboard</td></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/categories">Category</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Detail</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Image and Category Name */}
                    <Col span={24} md={12}>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            {/* Image Display */}
                            <Image
                                width={250} // Set width to 250
                                height={250} // Set height to 250 to ensure the image is square
                                src={category?.value?.imageUrl || 'https://via.placeholder.com/350'}
                                alt="Category"
                            />
                            {/* Category Name Display */}
                            <Form.Item label="Category Name" className="mt-3">
                                <Input
                                    value={category?.value?.categoryName || ''}
                                    readOnly
                                    placeholder="Category Name"
                                    style={{ width: '250px' }} // Đảm bảo chiều rộng của input bằng với chiều rộng của ảnh
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </form>
        </>
    );
}

export default DetailCategoryPage;
