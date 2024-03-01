import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
const Logo = ({ loading }) => {
    return (
        <Link className="Logo" >
            <h1>
                <span>Kho</span>Event
            </h1>

            {
                loading ? <div className='loading'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> : ''
            }

        </Link>
    )
}

export default Logo;