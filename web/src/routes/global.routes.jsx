import { createBrowserRouter } from 'react-router-dom';
import { StartScreen } from '../pages/StartScreen/StartScreen.jsx';
import { Home } from '../pages/Home/Home.jsx';
import { EventsDetails} from '../pages/EventsDetails/EventsDetails.jsx';


export const globalRoutes = [
    {
        path: '/',
        element: <StartScreen />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/events',
        element: <EventsDetails />
    },
    // {
    //     path: '/events',
    //     children: [
    //         {
    //             path: ':id',
    //             element: <EventsDetails />,
    //             loader: eventLoader
    //         }

    //     ]

    // },

];

export const globalRouter = createBrowserRouter(globalRoutes);
