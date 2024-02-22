import React, { useEffect } from 'react'
import Logo from '../../components/Logo/Logo'
import './StartScreen.css'
import { useNavigate } from 'react-router-dom'

export const StartScreen = () => {

    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            navigate('/login');
        }, 1500);

    }, []);

    return (
        <div className='StartScreen'>
            <Logo />
        </div>
    )
}

