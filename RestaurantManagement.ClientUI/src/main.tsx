import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <GoogleOAuthProvider clientId="512717206233-ul0hu3t49c9o30rf4lqueiqrliddrk7q.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </HashRouter>
)
