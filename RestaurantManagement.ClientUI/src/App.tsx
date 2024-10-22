// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import font awesome css
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
// import components
import Header from './components/header/header';
import Home from './pages/home/home';
import Footer from './components/footer/footer';
import ListCategory from './pages/categorypage/category';
import { Order } from './pages/orderpage/orderform';
import { Book } from './pages/bookpage/bookform';
import { Rule } from './components/rule/rule';


library.add(fas);

function App() {

  const Layout = () => {
    return (
      <>
        <div className="container-fluid" style={{ backgroundColor: '#E0DDA2' }}>
          <Header />
          <div className="container">
            <Outlet />
          </div>
          <Footer />
        </div>
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Home />
          )
        }, {
          path: "/category",
          element: (
            <ListCategory />
          )
        }, {
          path: "/order",
          element: (
            <Order />
          )
        }, {
          path: "/book",
          element: (
            <Book />
          )
        },
        {
          path: "/rule",
          element: (
            <Rule />
          )
        }
      ]
    }]);
  return < RouterProvider router={router} />
}

export default App
