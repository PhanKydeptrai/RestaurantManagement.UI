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
import ResetPasswordPage from './pages/auth-page/resetpassword';
import VerifyAccountPage from './pages/transacsion-page/verifyaccount';
import VerifyAccountCompletePage from './pages/transacsion-page/verifyaccountcomplete';
import ChangePasswordResultPage from './pages/transacsion-page/changepasswordresult';
import TransactionResultEmailPage from './pages/transacsion-page/transactionresultemail';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router

library.add(fas);

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isTransactionPage = ['/donetransaction', '/errortransaction', '/forgotpassword', '/verifyaccount', '/verifyaccountcomplete', '/changepasswordresult', '/transactionresult'].includes(location.pathname);
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
          <Route path="/verifyaccount" element={<VerifyAccountPage />} />
          <Route path="/verifyaccountcomplete" element={<VerifyAccountCompletePage />} />
          <Route path="/changepasswordresult" element={<ChangePasswordResultPage />} />
          <Route path="/transactionresult" element={<TransactionResultEmailPage />} />
        </Routes>
      </div>

    </>
  )
}

export default App
