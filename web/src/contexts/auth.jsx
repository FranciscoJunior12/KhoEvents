import { createContext, useState, useContext, useEffect } from 'react';
import { deleteRequest, post } from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);


    async function login(email, password) {
        const response = await post('/sessions', { email, password });

        if (!response.error) {
            setUser(response.data);
        } else {
            console.log('Falha na autenticação');
        }
        return response;
    }

    async function logout() {
        const response = await deleteRequest('/sessions');

        if (!response.error) {
            setUser(null);
        } else {
            alert('Falha no logout');
        }
        return response;
    }


    return (
        <AuthContext.Provider value={{ login, logout, user, signed: Boolean(user) }}>
            {children}
        </AuthContext.Provider>
    );

}