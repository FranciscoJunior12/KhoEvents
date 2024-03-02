import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Back from '../../assets/Back.png';
import DataWave from '../../assets/DataWave.png';
import './EventsDetails.css';
import { EventSignUp } from '../EventSignUp/EventSignUp';

export const EventsDetails = () => {
    const [event, setEvent] = useState({});
    const [useParams] = useSearchParams();
    const query = useParams.get("q");
    const url = import.meta.env.VITE_SOME_KEY;
    const api = axios.create({ baseURL: url, withCredentials: true });

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
                </section>
            </div>
        </>
    );
};
