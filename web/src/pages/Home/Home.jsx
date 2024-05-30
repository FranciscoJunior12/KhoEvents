import React, { useEffect } from 'react'
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import Lupa from '../../assets/Lupa.png';
import MenuBurguer from '../../assets/MenuBurguer.png';
import MozdevzLogo from '../../assets/MozdevzLogo.png';
import './Home.css';
import DataWave2 from '../../assets/DataWave2.png';
import HackDay from '../../assets/HackDay.png';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useFetch } from '../../services/api.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {

    const [Menu, setMenu] = useState(false);
    const { data: communities } = useFetch('communities');
    const { data: events } = useFetch('/events');
    const { signed, logout, user } = useContext(AuthContext);
    const defaultAvatar = createAvatar(identicon);



    function mostrarmenu() {
        setMenu(!Menu);
    }

    function handleLogout() {
        logout(); 
    }



    return (
        <div className="Home">
            <div className={Menu ? 'NavBar visivel' : 'NavBar invisivel'} id="NavBar">
                {signed ? (
                    <>
                        <a to="#">Sua comunidade</a>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Criar conta</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>

            <section className="ConteudoPrincipal">
                <div className="HeaderBar">
                    <div className="Campo" id="CampoPesquisa">
                        <input type="text" id="ProcurarEvento" placeholder="Procurar Evento" />
                        <img src={Lupa} alt="Foto mostrar password" />
                    </div>

                    <img src={MenuBurguer} alt="Foto MenuBurguer" className="MenuBurguer" onClick={mostrarmenu} />
                </div>

                <div className="DashbordPrincipal">
                    <div className="Comunidades">
                        <h2>Comunidades</h2>
                        <section className="BoxComunidades">

                            {communities ? communities.map((community) => {
                                return (
                                    <div key={community.id}>
                                        <img
                                            src={community.avatar ? community.avatar.url : defaultAvatar.toDataUriSync()}
                                            alt="Logotipo da Mozdevz"
                                        />
                                        <h2>{community.name}</h2>
                                        <p>
                                            Eventos:<span>18</span>
                                        </p>
                                    </div>

                                )
                            }

                            )
                                : <h1>Carregando comunidades...</h1>
                            }
                        </section>
                    </div>


                    <div className="ProximosEventos">
                        <h2>Próximos Eventos</h2>
                        <section className="BoxEventos">


                            {
                                events ? events.map((event) => {
                                    return (
                                        <Link key={event.id} className="BoxEventoConteudo" to={`/events?q=${event.id}`}>
                                            <div className="overlay">
                                                <p className="NomeComunidade">MOZDEV</p>
                                                <img className="ImagemEvento" src={DataWave2} alt="Icone Evento" />
                                                <article>
                                                    <h2 className="NomeEvento">{event.title}</h2>
                                                    <p className="DataHora">
                                                        {new Date(event.date).toLocaleDateString('pt-MZ')} | {event.startTime} - {event.endTime}
                                                    </p>
                                                    <p className="LocalEvento">{event.local}</p>
                                                </article>
                                            </div>
                                        </Link>
                                    )

                                }) : <h1>Carregando eventos...</h1>}

                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}
