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


export const Login = () => {

    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const notify = (message, error = true) => {
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

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, passsword)
            .then((response) => {
                if (!response.error) {
                    return navigate("/home")
                }

                notify("E-mail ou senha inválidos.", false)
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
