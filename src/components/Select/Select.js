import React from 'react';
import './Select.css';

const LandPage = () => {
	return (
		<div className='select-style'>
			<select>
			    <option className='option1' value="volvo">6</option>
			    <option value="saab">8</option>
			    <option value="mercedes">10</option>
			    <option value="audi">12</option>
			    <option className='option1' value="volvo">14</option>
			    <option value="saab">16</option>
			    <option value="mercedes">18</option>
			    <option value="audi">20</option>
		  	</select>
	  	</div>
	);
}

export default LandPage;