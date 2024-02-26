
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login/Login.jsx'
import { globalRoutes } from './global.routes.jsx'
import { SignUp } from '../pages/SignUp/SignUp.jsx';


export const openRoutes = [
    ...globalRoutes,
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },

]

export const openRouter = createBrowserRouter(openRoutes);