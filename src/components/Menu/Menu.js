import React from 'react';
import Logo from './snapsoft-logo.svg';
import './Menu.css';

const Menu = () => {
	return(
		<nav className="shadow-3 w-100 pa3 bg-black">
			  <a className="v-mid" href="#0" title="Home">
			    <img src={Logo} width='100px' className="logo" alt="Site Name"/>
			  </a>
			  	<a className="ph3-l pointer white" href="#0"> MEMORY GAME </a>
		</nav>
	);
}

export default Menu;