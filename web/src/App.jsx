import './App.css'
import Login from './pages/Login/Login';
// import Login from './pages/Login/Login.jsx';
import StartScreen from './pages/StartScreen/StartScreen'
import { useFetch } from './services/api';

function App() {

  const { data: status, error } = useFetch('status');

 
  return (
    <>
      <div id="api-status" className={status ? 'running' : ''}></div>
      <StartScreen />
      {/* <Login/> */}
    </>
  )
}

export default App;
