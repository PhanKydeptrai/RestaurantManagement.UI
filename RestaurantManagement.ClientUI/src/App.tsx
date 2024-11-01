// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import font awesome css
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import react router

import Header from './components/header';
import Footer from './components/footer';
import ControllerPage from './Controller';


library.add(fas);

function App() {
  return (
    <>
      <div className="container-fluild">
        <Header />
        <div className="container">
          <ControllerPage />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
