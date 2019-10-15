import React from 'react';
import './Select.css';

const numbers = [6,8,10,12,14,16,18,20];

const Select = ({setCardAmount}) => {

	const dropDown = numbers.map((item, i) => {
	    return(
	      <option key={i} value={item}>{item}</option>
	    );
  	});

	return (
		<div className='select-style'>
			<select onChange={(event) => setCardAmount(event.target.value)}>
			    {
					dropDown
				}
		  	</select>
	  	</div>
	);
}

export default Select;