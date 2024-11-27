import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import ContentPage from './components/content/contents'
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './page/authentication/login';
import MenuPage from './page/normalpage/menu/menus';
import BookFormOfNormal from './page/normalpage/book/book';
library.add(fas);

function App() {
  const location = useLocation();
  const showLayout = !['/login', '/register', '/forgotpassword'].includes(location.pathname);
  return (
    <>
      {location.pathname !== '/login'}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Main */}
        <Route path="/" element={showLayout ? <ContentPage /> : null}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="normalbook" element={<BookFormOfNormal />} />

        </Route>

      </Routes>

    </>
  )
}

export default App
