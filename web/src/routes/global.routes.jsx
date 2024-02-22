import { createBrowserRouter } from 'react-router-dom';
import { StartScreen } from '../pages/StartScreen/StartScreen.jsx';


export const globalRoutes = [
    {
        path: '/',
        element: <StartScreen />
    },

];

export const globalRouter = createBrowserRouter(globalRoutes);
