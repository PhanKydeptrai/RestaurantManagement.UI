import { Breadcrumb, Col, Row, Button, Tabs } from "antd";
import { Link } from "react-router-dom";
import HistoryBillPage from "./historybill";
import HistoryBookingPage from "./historybooking";
import HistoryEmployeePage from "./historyemp";
import HistoryCustomerPage from "./historycustomer";
import HistoryCategoryPage from "./historycategory";
import HistoryMealPage from "./historymeal";
import HistoryOrderPage from "./historyorder";
import HistoryTablePage from "./historytable";
import HistoryTableTypePage from "./historytabletype";

const ListLogHistoryPage = () => {

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/dashboard"><td>Dashboard</td></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/log"><td>Log</td></Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="1"
                centered
                items={[
                    {
                        label: 'History Employee',
                        key: '1',
                        children: <HistoryEmployeePage />,
                    },
                    {
                        label: 'History Customer',
                        key: '2',
                        children: <HistoryCustomerPage />,
                    },
                    {
                        label: 'History Category',
                        key: '3',
                        children: <HistoryCategoryPage />,
                    },
                    {
                        label: 'History Meal',
                        key: '4',
                        children: <HistoryMealPage />,
                    },
                    {
                        label: 'History Booking',
                        key: '5',
                        children: <HistoryBookingPage />,
                    },
                    {
                        label: 'History Order',
                        key: '6',
                        children: <HistoryOrderPage />,
                    },
                    {
                        label: 'History Table',
                        key: '7',
                        children: <HistoryTablePage />,
                    },
                    {
                        label: 'History Table Type',
                        key: '8',
                        children: <HistoryTableTypePage />,
                    },
                    {
                        label: 'History Bill',
                        key: '9',
                        children: <HistoryBillPage />,
                    },

                ]}
            />

        </>
    )
}

export default ListLogHistoryPage;
