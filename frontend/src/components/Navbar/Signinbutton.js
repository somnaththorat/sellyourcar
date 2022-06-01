import React from 'react';
import './Signinbutton.css';

const STYLES = [
    'btn--primary',
    'btn--large'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Signinbutton = ({
    children, type, onClick, buttonStyle, buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}  type= {type}>
            {children}
        </button>
    )
}