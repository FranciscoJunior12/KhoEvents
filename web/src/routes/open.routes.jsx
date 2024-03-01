
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login/Login.jsx'
import { globalRoutes } from './global.routes.jsx'
import { SignUp } from '../pages/SignUp/SignUp.jsx';
import { VerifyEmail } from '../pages/VerifyEmail/VerifyEmail.jsx';
import { EmailVerified } from '../pages/EmailVerified/EmailVerified.jsx';



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
    {
        path: "/verify-email",
        element: <VerifyEmail />
    },
    {
        path: "/verify/:id",
        element: <EmailVerified />
    }

]

export const openRouter = createBrowserRouter(openRoutes);