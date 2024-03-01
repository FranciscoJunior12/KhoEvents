import React, { useContext, useState } from 'react'
import emailIcon from '../../assets/email.png'

import './VerifyEmail.css'
import { AuthContext } from '../../contexts/auth'
import { post } from '../../services/api'
import { NotificationContext } from '../../contexts/notification'
import { ToastContainer } from 'react-toastify'

export const VerifyEmail = () => {

    const { mailToSendLink } = useContext(AuthContext);
    const { notify } = useContext(NotificationContext)
    const [buttonText, setButtonText] = useState('Reenviar email');
    const [loading, setLoading] = useState(false);

    const resendLink = () => {

        if (loading) {
            return
        }
        setLoading(true)
        setButtonText('Aguarde..')

        post('communities/send-email', { email: mailToSendLink })
            .then(() => {
                setButtonText('Reenviar email');
                setLoading(false)
                notify('Link reenviado com sucesso!', false)
            });
    }

    return (
        <div id='verify-container' className='display'>
            <div id='content-div' className='display'>
                <img src={emailIcon} alt="icon de email" />
                <div id="text" className='display'>
                    <h1>Verifique o seu Email!</h1>
                    <p>Você está quase lá! Nós enviamos um email para:
                        <p style={{ textAlign: 'center' }}><span>{mailToSendLink}</span></p>
                    </p>

                    <p >
                        Clique no link enviado para o seu email para completar o cadastro. Caso não
                        <p style={{ textAlign: 'center' }}>tenha recebido, você pode ter que consultar span.</p>
                    </p>

                    <p>Ainda não encontrou o email? sem problema.</p>
                    <button
                        style={{ backgroundImage: 'none' }}
                        type='submit'
                        className={`Submeter ${loading ? 'waiting' : ''}`}
                        onClick={resendLink}
                    >

                        {buttonText}
                    </button>

                </div>
            </div>

            <ToastContainer />
        </div >
    )
}
