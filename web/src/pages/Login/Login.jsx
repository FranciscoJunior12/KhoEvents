import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Lock from '../../assets/Lock.png';
import Message from '../../assets/Message.png';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/input/Input';
import './Login.css'
import { AuthContext } from '../../contexts/auth.jsx';
import { NotificationContext } from '../../contexts/notification.jsx';


export const Login = () => {

    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const { notify } = useContext(NotificationContext);
    const navigate = useNavigate();




    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !passsword) return notify("Preencha todos os campos!", true);

        login(email, passsword)
            .then((response) => {
                if (!response.error) {
                    return navigate("/home")
                }

                notify("E-mail ou senha inválidos.", true);
            })

    }

    return (
        <div className="Login">

            <Logo />
            <form action="#">
                <h2 className="EntrarTitulo">Entrar</h2>
                <Input label="E-mail" name="email" icon={Message} type="email" onChange={(e) => setEmail(e.target.value)} />

                <Input
                    label="Password"
                    name="password"
                    icon={Lock}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" value="Entrar" className="Submeter" onClick={handleLogin} />
                <p className="ContaCriar">
                    Não tens uma conta😥?
                    <Link to="/signup" className="Inscrever">
                        Cadastrar
                    </Link>
                </p>
            </form>

            <ToastContainer />
        </div>
    )
}
