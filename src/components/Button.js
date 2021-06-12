import React from 'react';

const Button = (props) => (
    <button {...props} className="custom-button">{props.children}</button>
)

export default Button;
