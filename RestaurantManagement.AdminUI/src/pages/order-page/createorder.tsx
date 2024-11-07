import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TableDto } from "../../models/tableDto";
import { MealDto } from "../../models/mealDto";
import axios from "axios";

const CreateOrderPage = () => {
    const { tableId } = useParams<{ tableId: string }>();
    const navigate = useNavigate();

    // State
    const [table, setTable] = useState<TableDto | null>(null);
    const [meals, setMeals] = useState<MealDto[]>([]);
    const [mealId, setMealId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Lấy thông tin bàn theo ID
    useEffect(() => {
        const fetchTable = async () => {
            try {
                //https://localhost:7057/api/table?filterActiveStatus=Occupied&page=1&pageSize=100

                setLoading(true);
                const response = await axios.get(`https://localhost:7057/api/orders/${tableId}`);
                const fetchedTable: TableDto = response.data;

                // Kiểm tra trạng thái bàn có phải là "Occupied" không
                if (fetchedTable.activeStatus !== "Occupied") {
                    setError("This table is not occupied.");
                } else {
                    setTable(fetchedTable);
                }
            } catch (error) {
                setError("Failed to fetch table information.");
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [tableId]);

    // Lấy danh sách các món ăn
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get("https://localhost:7057/api/meal");
                setMeals(response.data);
            } catch (error) {
                setError("Failed to fetch meals.");
            }
        };

        fetchMeals();
    }, []);

    // Hàm tạo order
    const createOrder = async () => {
        if (!mealId) {
            setError("Please select a meal.");
            return;
        }

        try {
            setLoading(true);
            const orderData = {
                tableId: table?.tableId,
                mealId: mealId,
                quantity: quantity,
            };

            // Gửi yêu cầu tạo order
            const response = await axios.post("/api/orders", orderData);
            console.log("Order created:", response.data);
            alert("Order has been created successfully!");

            // Chuyển hướng về trang trước đó hoặc trang khác sau khi tạo order
            navigate("/orders");
        } catch (error) {
            setError("Failed to create order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {table && !loading && !error && (
                <>
                    <h2>Create Order for Table {table.tableId}</h2>

                    <div>
                        <h3>Select a Meal</h3>
                        <select
                            value={mealId ?? ""}
                            onChange={(e) => setMealId(Number(e.target.value))}
                        >
                            <option value="" disabled>Select a meal</option>
                            {meals.map((meal) => (
                                <option key={meal.mealId} value={meal.mealId}>
                                    {meal.mealName} - ${meal.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3>Quantity</h3>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                        />
                    </div>

                    <div>
                        <button onClick={createOrder} disabled={loading}>
                            Create Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateOrderPage;
