import React from 'react';
import './TextField.css';

const TextField = ({placeholder, value, onValueChanged}) => {

	const handleInputValueChanged = (event) => {
		onValueChanged(event.target.value);
	}

	return (
		<div className="text-field">
			<input className="bodyMStrong colorTextPrimary" type="text" placeholder={placeholder} value={value}
				   onChange={handleInputValueChanged}/>
		</div>
	);
}

export default TextField;