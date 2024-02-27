
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import { AuthProvider } from './contexts/auth.jsx';


;
import { Router } from './routes';
import { useFetch } from './services/api';
import { NotificationProvider } from './contexts/notification.jsx';

function App() {

  const { data: status, error } = useFetch('status');

  return (

    <AuthProvider>


      <NotificationProvider>

        {/* <div id="api-status" className={status ? 'running' : ''}></div> */}
        <Router />
      </NotificationProvider>


    </AuthProvider>

  )
}

export default App;
