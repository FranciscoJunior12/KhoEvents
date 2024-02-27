import { createContext, useState, useContext, useEffect } from 'react';


export const NotificationContext = createContext({});
import { toast } from 'react-toastify';

export function NotificationProvider({ children }) {

    function notify(message, error = true) {
        if (error) {

            return toast.error(message, {
                position: "top-center",
                autoClose: 3500,
                pauseOnHover: false,
                theme: "dark",

            });

        }

        toast.success(message, {
            position: "top-center",
            autoClose: 3500,
            pauseOnHover: false,
            theme: "dark",

        });


    }

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
        </NotificationContext.Provider>
    );

}