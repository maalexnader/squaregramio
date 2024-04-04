import React from 'react';
import './Button.css';

const Button = ({onClick, title}) => {
	return (
		<div className="button" onClick={onClick}>
			<span className="subheadingS colorBrand">{title}</span>
		</div>
	);
}

export default Button;