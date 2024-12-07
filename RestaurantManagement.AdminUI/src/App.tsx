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
import TransactionCompletePage from './pages/transacsion-page/transactioncomplete';
import TransactionErrorPage from './pages/transacsion-page/transactionerror';
import TransactionLayout from './transactionlayout';
import ResetPasswordPage from './pages/auth-page/resetpassword';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router

library.add(fas);

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isTransactionPage = ['/donetransaction', '/errortransaction', '/forgotpassword'].includes(location.pathname);
  return (
    <>
      {!isLoginPage && !isTransactionPage && <Header />}
      {!isLoginPage && !isTransactionPage && (
        <div className="">
          <SliderBar />
        </div>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/forgotpassword' element={<ResetPasswordPage />} />
          <Route path='/donetransaction' element={<TransactionCompletePage />} />
          <Route path='/errortransaction' element={<TransactionErrorPage />} />

        </Routes>
      </div>

    </>
  )
}

export default App
