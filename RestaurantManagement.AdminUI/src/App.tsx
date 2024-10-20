// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import font awesome css
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Controller from './Controller';
import Header from './components/header/header';
import SliderBar from './components/slidebar/sliderbar';
import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router

library.add(fas);

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';
  return (
    <>
      {!isLoginPage && <Header />}
      <div className="container-fluid">
        <div className="row">
          {!isLoginPage && (
            <div className="col-md-2">
              <SliderBar />
            </div>
          )}
          <div className={isLoginPage ? 'col-md-12' : 'col-md-10'}>
            <Controller />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
