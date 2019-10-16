import React from 'react';
import './GamePage.css';
import CardList from '../Cards/CardList';

const GamePage = ({cardAmount, setCardState, cardItemArray, user}) => {
	return (
		<div>
			<div className="container pt4 pb4">
			  <div className='f6 gray'>Current tries:<div className='dib pa2 black fw5 f5'>{user.tries}</div></div>
			  <div className='f6 gray'>Best:<div className='black fw5 f3 pt2'>{user.best}</div></div>
			  <div><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="RESTART"/></div>
			</div>
			<CardList cardItemArray={cardItemArray} cardAmount={cardAmount} setCardState={setCardState}/>
		</div>
	);
}

export default GamePage;