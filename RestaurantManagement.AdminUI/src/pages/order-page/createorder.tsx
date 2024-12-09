import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderDto, OrderDetailDto } from '../../models/orderDto';
import { GetAllMeals } from '../../services/meal-services';
import { CreateOrder } from '../../services/order-services';
import { toast, ToastContainer } from 'react-toastify';
import { Input, Button, Row, Col, Card, Typography, Spin, Form, Breadcrumb, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CreateOrderPage = () => {
  const [tableId, setTableId] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [orderTime, setOrderTime] = useState<string>('');
  const [mealId, setMealId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [meals, setMeals] = useState<any[]>([]); // Dữ liệu món ăn
  const [orderDetails, setOrderDetails] = useState<OrderDetailDto[]>([]);
  const [totalAmount, setTotalAmount] = useState<string>('0');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(8); // Setting page size to 8
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Fetching meal data when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        console.log('fetching data');
        const result = await GetAllMeals(pageSize, pageIndex, searchTerm);
        console.log(result.items);
        setMeals(result.items);
        setHasNextPage(result.hasNextPage);
        setHasPreviousPage(result.hasPreviousPage);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [pageIndex, pageSize, searchTerm]);

  //#region Message
  const notifySuccess = () => {
    toast.success('Thành công!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  const notifyError = () => {
    toast.error('Vui lòng kiểm tra lại!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };
  //#endregion

  const handleIncreaseQuantity = (mealId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [mealId]: (prevQuantities[mealId] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (mealId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [mealId]: Math.max((prevQuantities[mealId] || 0) - 1, 0),
    }));
  };

  // Xử lý khi người dùng tạo đơn hàng
  const handleCreateOrder = async (mealId: string) => {
    const quantity = quantities[mealId] || 0;
    if (quantity === 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`https://restaurantmanagement.azurewebsites.net/api/orders/${tableId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-key': '30B34DCD-1CC0-4AAF-B622-7982847F221F'

        },
        body: JSON.stringify({ mealId, quantity }),
      });
      console.log('Data to be sent:', { mealId, quantity });
      const data = await response.json();
      console.log('Order created:', data);
      if (response.ok) {
        notifySuccess();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><td>Dashboard</td></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/orders">Order</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <div className="container mt-5">

        {/* Row for Table ID input */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Table ID">
              <Input
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                placeholder="Enter Table ID"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Meal Selection */}
        <Title level={3}>Select Meals</Title>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            {meals.map((meal) => (
              <Col key={meal.mealId} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img src={meal.imageUrl} alt={meal.mealName} style={{ height: '150px', objectFit: 'cover' }} />}
                >
                  <Card.Meta title={meal.mealName} description={`Price: ${meal.price} VND`} />
                  <div className="d-flex align-items-center mt-3">
                    <Button
                      className="btn-secondary"
                      onClick={() => handleDecreaseQuantity(meal.mealId)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{quantities[meal.mealId] || 0}</span>
                    <Button
                      className="btn-secondary"
                      onClick={() => handleIncreaseQuantity(meal.mealId)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-3"
                    onClick={() => handleCreateOrder(meal.mealId)}
                  >
                    Add to Order
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            className='mt-4'
            current={pageIndex}
            total={totalCount}
            pageSize={pageSize}
            onChange={setPageIndex}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </Spin>

        {/* Cancel and Create Buttons */}
        <div className="mt-4">
          <Link to="/orders">
            <Button type="default" className="mr-2">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateOrderPage;
