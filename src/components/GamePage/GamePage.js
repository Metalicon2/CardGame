import React from 'react';
import './GamePage.css';
import CardList from '../Cards/CardList';

const GamePage = ({cardAmount, setCardState, cardState, cardItemArray}) => {
	return (
		<div>
			<div className="container pt4 pb4">
			  <div className='f6 gray'>Current tries:</div>
			  <div className='f6 gray'>Best:</div>
			  <div><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="RESTART"/></div>
			</div>
			<CardList cardItemArray={cardItemArray} cardAmount={cardAmount} setCardState={setCardState} cardState={cardState}/>
		</div>
	);
}

export default GamePage;