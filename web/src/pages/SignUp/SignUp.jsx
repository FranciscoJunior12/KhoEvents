
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'


import Message from '../../assets/Message.png';
import Lock from '../../assets/Lock.png';
import Profile from '../../assets/Profile.png';
import IconBack from '../../assets/Back.png'

import Logo from '../../components/Logo/Logo';
import Input from '../../components/input/Input';

import './SignUp.css';

export const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Submit clicked");

    }

    return (
        <div className='SignUp'>
            <Logo />

            <form action="#">
                <Link to="/login">
                    <img src={IconBack} alt="Ícone Voltar" />
                </Link>


                <h2 className="EntrarTitulo">Cadastro</h2>
                <Input label="Nome completo" name="name" icon={Profile} type="text" onChange={(e) => setName(e.target.value)} />

                <Input label="E-mail" name="email" icon={Message} type="email" onChange={(e) => setEmail(e.target.value)} />

                <Input
                    label="Password"
                    name="password"
                    icon={Lock}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" value="Entrar" className="Submeter" onClick={handleSubmit} />

                <p className="ContaCriar">
                    Já tem uma comunidade😁?
                    <Link to="/login" className="Inscrever">
                        Entrar
                    </Link>
                </p>



            </form>
        </div>
    )
}
