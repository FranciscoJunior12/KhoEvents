import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Back from '../../assets/Back.png';
import DataWave from '../../assets/DataWave.png';
import speaker from '../../assets/Speaker.png';
import speaker1 from '../../assets/speaker1.png';
import speaker2 from '../../assets/Speaker2.png';
import './EventsDetails.css';
import { EventSignUp } from '../EventSignUp/EventSignUp';

export const EventsDetails = () => {
    const [event, setEvent] = useState({});
    const [useParams] = useSearchParams();
    const query = useParams.get("q");
    const url = import.meta.env.VITE_SOME_KEY;
    const api = axios.create({ baseURL: url, withCredentials: true });

    const handleClick = () => {



        
    }

    useEffect(() => {
        if (query) {
            api.get(`${url}events/${query}`)
                .then((response) => {
                    console.log(response.data);
                    setEvent(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [query, url]);

    return (
        <>


            <div className="DetalhesEvento">
                <Link to="/home">
                    <img className="ImagemVoltar" src={Back} alt="Ícone Voltar" />
                </Link>
                <section className="BoxConteudoEvento">
                    <div className="overlay">

                        <img src={DataWave} alt="Imagem do evento" />
                        <section className="OverviewEvento">
                            <article>
                                <h2 className="NomeEvento">{event.title}</h2>
                                <p className="DataEvento">Data: {new Date(event.date).toLocaleDateString('pt-MZ')} | Hora: {event.startTime} - {event.endTime}</p>
                                <p className="LocalEvento">Local: {event.local}</p>
                            </article>
                            <button className="BotaoInscrever">+</button>
                        </section>
                    </div>
                    <h2 className="Descricao" id="DescricaoTitulo">
                        O que é {event.title}?
                    </h2>
                    <p className="Descricao">
                        {event.description}
                    </p>
                    <div className='goals'>
                        <h3>OBJECTIVOS DO EVENTO</h3>
                        <div id="goals">
                            <div id="h1">
                                <h1>1</h1>
                            </div>
                            <p>
                                Explorar oportunidades e desafios no ramo de ciência de dados no contexto local
                            </p>
                        </div>
                        <div id="goals">
                            <div id="h1">
                                <h1>2</h1>
                            </div>
                            <p>
                                Explorar oportunidades e desafios no ramo de ciência de dados no contexto local
                            </p>
                        </div>
                        <div id="goals">
                            <div id="h1">
                                <h1>3</h1>
                            </div>
                            <p>
                                Explorar oportunidades e desafios no ramo de ciência de dados no contexto local
                            </p>
                        </div>
                    </div>



                    <div className="ProximosEventos">
                        <h2>ORADDORES</h2>
                        <section className="BoxEventos">


                            <Link className="BoxEventoConteudo" to={`/events?q=${event.id}`}>
                                <div className="overlay">

                                    <img className="ImagemEvento" src={speaker} alt="Icone Evento" />
                                    <article>
                                        <h2 className="NomeEvento">ABNEUSA MANUEL</h2>

                                        <p className="LocalEvento">M-Pesa Senior Business Analyst</p>
                                    </article>
                                </div>
                            </Link>
                            <Link className="BoxEventoConteudo" to={`/events?q=${event.id}`}>
                                <div className="overlay">

                                    <img className="ImagemEvento" src={speaker2} alt="Icone Evento" />
                                    <article>
                                        <h2 className="NomeEvento">MARGARIDA</h2>

                                        <p className="LocalEvento">BRR Enginee  - Vodacom Moçambique</p>
                                    </article>
                                </div>
                            </Link>
                            <Link className="BoxEventoConteudo" to={`/events?q=${event.id}`}>
                                <div className="overlay">

                                    <img className="ImagemEvento" src={speaker1} alt="Icone Evento" />
                                    <article>
                                        <h2 className="NomeEvento">LAUDIO MUFUME</h2>

                                        <p className="LocalEvento">Gestor da Área de Dados - Vodacom</p>
                                    </article>
                                </div>
                            </Link>




                        </section>
                    </div>


                    <input type="submit" value="Inscreve-se" className="Submeter" onClick={handleClick} />
                </section>



            </div>
        </>
    );
};
