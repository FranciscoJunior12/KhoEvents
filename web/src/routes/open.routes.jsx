
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login/Login.jsx'
import { globalRoutes } from './global.routes.jsx'


export const openRoutes = [
    ...globalRoutes,
    {
        path: "/login",
        element: <Login />
    },

]

export const openRouter = createBrowserRouter(openRoutes);