import React, { useContext, useState } from 'react'
import Lock from '../../assets/Lock.png';
import Message from '../../assets/Message.png';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/input/Input';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.jsx';
// import Input from '../../components/Input/Input';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, passsword).then((response) => {
            console.log(response);
            if (!response.error) {
                navigate("/home")
            }
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
        </div>
    )
}
