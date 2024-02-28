import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './EmailVerified.css'
import { pacthRequeste } from '../../services/api'

export const EmailVerified = () => {

    const { id } = useParams();

    useEffect(() => {

        pacthRequeste(`communities/verify/${id}`, {})
            .then((response) => {
                console.log(response.data);
                console.log(response.error);

            })


    }, []);

    return (

        <div className='display' id="verify-container">

            <h1><span>Congratulations🎉</span><br /></h1>
            <h1>email acccout verified!</h1>

            <p>
                <Link to="/login">clique aqui</Link> to go login.
            </p>

        </div>
    )
}
