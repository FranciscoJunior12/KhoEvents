import './App.css'
import { AuthProvider } from './contexts/auth.jsx';


import { Router } from './routes';
import { useFetch } from './services/api';

function App() {

  const { data: status, error } = useFetch('status');


  return (

    <AuthProvider>

      {/* <div id="api-status" className={status ? 'running' : ''}></div> */}
      <Router />
    </AuthProvider>

  )
}

export default App;
  