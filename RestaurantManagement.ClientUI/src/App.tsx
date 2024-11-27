import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import ContentPage from './components/content/contents'
library.add(fas);

function App() {

  return (
    <>
      <ContentPage />
    </>
  )
}

export default App
