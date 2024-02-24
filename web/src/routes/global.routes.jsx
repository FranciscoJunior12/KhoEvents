import { createBrowserRouter } from 'react-router-dom';
import { StartScreen } from '../pages/StartScreen/StartScreen.jsx';
import { Home } from '../pages/Home/Home.jsx';


export const globalRoutes = [
    {
        path: '/',
        element: <StartScreen />
    },
    {
        path: '/home',
        element: <Home />
    },

];

export const globalRouter = createBrowserRouter(globalRoutes);
