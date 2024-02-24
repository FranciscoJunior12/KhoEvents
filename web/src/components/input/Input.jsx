import React from 'react'

const Input = ({ name, label, icon, ...props }) => {
    return (
        <div className="Campo">

            <label htmlFor={name}>
                <img src={icon} alt={`Ícone de ${label}`} />
            </label>
            <input id={name} placeholder={label} {...props}  />

        </div>
    )
}

export default Input;