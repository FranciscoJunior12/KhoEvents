import React from 'react'
import Lock from '../../assets/Lock.png';
import Message from '../../assets/Message.png';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/input/Input';
import './Login.css'
// import Input from '../../components/Input/Input';

const Login = () => {
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

                <input type="submit" value="Entrar" className="Submeter"  />
                <p className="ContaCriar">
                    Não tens uma conta😥?
                    <a to="/signup" className="Inscrever">
                        Cadastrar
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Login;