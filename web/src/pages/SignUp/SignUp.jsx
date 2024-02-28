
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


import Message from '../../assets/Message.png';
import Lock from '../../assets/Lock.png';
import Profile from '../../assets/Profile.png';
import IconBack from '../../assets/Back.png'

import Logo from '../../components/Logo/Logo';
import Input from '../../components/input/Input';

import { NotificationContext } from '../../contexts/notification.jsx'
import { post } from '../../services/api.js'

import './SignUp.css';
import { AuthContext } from '../../contexts/auth.jsx';


export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmePassword, setConfirmePassword] = useState('');
    const navigate = useNavigate();

    const { notify } = useContext(NotificationContext);
    const { setMailToSendLink } = useContext(AuthContext);



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmePassword) return notify('Preencha todos os campos', true);

        if (password.length < 6) return notify('Senha deve ter mais de 6 caracteres.', true);
        if (name.length < 3) return notify('Nome deve ter mais de 2 caracteres.', true);

        if (password !== confirmePassword) return notify('As senhas não correspondem.', true);

        post('/communities', { name, email, password })
            .then((response) => {

                if (!response.error) {

                    return navigate('/verificar-email');
                }

                if (response.error.response.status === 403) return notify('E-mail já existe.');
                if (response.error.response.status === 400) return notify('E-mail inválido.')
                if (response.error.response.status === 500) return notify('Falha no servidor, tente novamente mais tarde.')
            })






    }

    return (
        <div className='SignUp'>
            <Logo />

            <form action="#">
                <Link to="/login">
                    <img src={IconBack} alt="Ícone Voltar" />
                </Link>


                <h2 className="EntrarTitulo">Cadastro</h2>
                <Input label="Nome da comunidade" name="name" icon={Profile} type="text" onChange={(e) => setName(e.target.value)} />

                <Input label="E-mail" name="email" icon={Message} type="email" onChange={(e) => {
                    setEmail(e.target.value)
                    setMailToSendLink(e.target.value)
                }} />

                <Input
                    label="Senha"
                    name="password"
                    icon={Lock}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    label="Confirmar senha"
                    name="password"
                    icon={Lock}
                    type="password"
                    onChange={(e) => setConfirmePassword(e.target.value)}
                />

                <input type="submit" value="Cadastrar" className="Submeter" onClick={handleSubmit} />

                <p className="ContaCriar">
                    Já tem uma comunidade😁?
                    <Link to="/login" className="Inscrever">
                        Entrar
                    </Link>
                </p>



            </form>

            <ToastContainer />
        </div>
    )
}
