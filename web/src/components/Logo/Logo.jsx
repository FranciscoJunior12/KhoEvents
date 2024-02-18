import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
const Logo = () => {
    return (
        <a className="Logo" to="/home">
            <h1>
                <span>Kho</span>Event
            </h1>
        </a>
    )
}

export default Logo