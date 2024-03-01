import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './EmailVerified.css'
import { pacthRequeste } from '../../services/api'

export const EmailVerified = () => {
    const [verified, setVerified] = useState(true);

    const { id } = useParams();

    useEffect(() => {

        pacthRequeste(`communities/verify/${id}`, {})
            .then((response) => {

                if (!response.error) {
                    return setVerified(true)
                }

                return setVerified(false)

            })


    }, []);

    return (
        <>


            <div className='display' id="verify-container">
                {
                    verified ?
                        <>
                            <h1><span>Congratulations🎉</span><br /></h1>
                            <h1>email acccout verified!</h1>

                            <p>
                                <Link to="/login">clique aqui</Link> to go login.
                            </p>
                        </>
                        :
                        <>
                            <h1><span style={{color:'red'}}>Sorry, Invalid link or Expired!😱</span><br /></h1>
                            <h1>email acccout not verified yet!</h1>

                            <p>
                                <Link to="/verify-email">clique aqui to resend</Link>.
                            </p>
                        </>

                }


            </div>



        </>


    )
}
