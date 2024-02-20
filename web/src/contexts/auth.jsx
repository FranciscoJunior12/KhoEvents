import { createContext, useState, useContext, useEffect } from 'react';
import { post } from '../services/api';

export const AuthContext = createContext({});


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);


    async function login(email, password) {
        const response = await post('/sessions', { email, password });

        if (!response.error) {
            setUser(response.data);
        } else {
            alert('Falha na autenticação');
        }
        return response;
    }



    return (
        <AuthContext.Provider value={{ login, user, signed: Boolean(user) }}>
            {children}
        </AuthContext.Provider>
    );

}