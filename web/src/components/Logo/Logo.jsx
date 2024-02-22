import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
const Logo = ({ to }) => {
    return (
        <Link className="Logo" to={to}>
            <h1>
                <span>Kho</span>Event
            </h1>
        </Link>
    )
}

export default Logo;