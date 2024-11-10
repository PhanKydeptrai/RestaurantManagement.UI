import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderDto, OrderDetailDto } from '../../models/orderDto';
import { GetAllMeals } from '../../services/meal-services';
import { CreateOrder } from '../../services/order-services';
import { toast, ToastContainer } from 'react-toastify';
// import { GetMeals } from '../../services/meal-services'; // Giả sử đây là service để lấy danh sách món ăn.
// import { CreateOrder } from '../../services/order-services'; // Giả sử đây là service để tạo đơn hàng.

const CreateOrderPage = () => {
  const [tableId, setTableId] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
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
  // Fetching meal data when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        console.log("fetching data");
        const result = await GetAllMeals(pageSize, pageIndex, searchTerm);
        console.log(result.items);
        setMeals(result.items);
        setHasNextPage(result.hasNextPage);
        setHasPreviousPage(result.haspreviousPage);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [pageIndex, pageSize]);

  //#region Message
  const notifySucess = () => {
    toast.success('Thành công!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  }

  const notifyError = () => {
    toast.error('Vui lòng kiểm tra lại!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  }
  //#endregion
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

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
      const response = await fetch(`https://localhost:7057/api/orders/${tableId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mealId, quantity }),
      })
      console.log('Data to be sent:', { mealId, quantity });
      const data = await response.json();
      console.log('Order created:', data);
      if (response.ok) {
        notifySucess();
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
      <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
        <div className="col ">
          <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4 ">
            <ol className="breadcrumb mb-0 ">
              <li className="breadcrumb-item"><Link to="/dashboard"><dt>Dashboard</dt></Link></li>
              <li className="breadcrumb-item"><Link to="/orders">Order</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Create</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container mt-5">
        <h2>Create Order</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="tableId">Table ID</label>
              <input
                type="text"
                id="tableId"
                className="form-control"
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                placeholder="Enter Table ID"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mt-4">Select Meals</h3>
          <div className="row">
            {meals.map((meal) => (
              <div key={meal.mealId} className="col-md-4">
                <div className="card">
                  <img
                    src={meal.imageUrl}
                    className="card-img-top"
                    alt={meal.mealName}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{meal.mealName}</h5>
                    <p className="card-text">Price: {meal.price} VND</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDecreaseQuantity(meal.mealId)}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantities[meal.mealId] || 0}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleIncreaseQuantity(meal.mealId)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleCreateOrder(meal.mealId)}
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="mt-4">

          <Link to="/orders" className="btn btn-danger ml-2">
            Cancel
          </Link>
        </div>
        <ToastContainer />

      </div>
    </>
  );
};

export default CreateOrderPage;
