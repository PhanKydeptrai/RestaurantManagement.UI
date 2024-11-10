// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import font awesome css
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Controller from './Controller';
import Header from './components/header/header';
import SliderBar from './components/slidebar/sliderbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/auth-page/login';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router

library.add(fas);

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && (
        <div className="">
          <SliderBar />
        </div>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>

    </>
  )
}

export default App
