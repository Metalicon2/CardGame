import React from 'react';
import Logo from './snapsoft-logo.svg';
import './Menu.css';
import Select from '../Select/Select';

const style = {
	display: 'inline-flex'
}

const Menu = ({route, setCardAmount, onRouteChange, newGame, cardAmount}) => {
	return(
		route === 'home' ?
		<nav className="shadow-3 w-100 bg-black pa3">
			  <a className="v-mid" href="#0" title="Home">
			    <img src={Logo} width='100px' className="logo" alt="Site Name"/>
			  </a>
			  	<a className="ph3-l pointer white" href="#0"> MEMORY GAME </a>
		</nav>
		:
		<nav className="shadow-3 w-100 bg-black pa2">
			  <a onClick={() => onRouteChange('home')} className="v-mid" href="#0" title="Home">
			    <img src={Logo} width='100px' className="logo" alt="Site Name"/>
			  </a>
			  	<a className="ph3-l pointer white" href="#0"> MEMORY GAME </a>
			  	<p className='deck f6 tc dib pr3 silver'> Deck size: </p>
			  	<Select style={style} setCardAmount={setCardAmount}/>
			  	<div className='dib ml3'>
					<input className="b ba white grow pointer f5 pa3 ph4" 
						   type="submit" 
						   value="START NEW GAME" 
						   onClick={
						   	() => newGame('menu')
						   }
				/>
				</div>
		</nav>
	);
}

export default Menu;