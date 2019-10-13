import React from 'react';
import './LandPage.css';
import Select from '../Select/Select';

const LandPage = ({onRouteChange, setCardAmount}) => {
	return (
		<div>
			<h1 className='tc f1 ma0 mt6'> SNAPSOFT </h1>
			<h3 className='tc f3 ma1'> MEMORY GAME </h3>
			<p className='f6 tc mt6 silver'> Deck size: </p>
			<Select setCardAmount={setCardAmount}/>
			<div className='tc'>
				<input className="b ba white grow pointer f5 pa3 ph4 ma3 mt4" type="submit" value="START NEW GAME" onClick={() => onRouteChange('play')}/>
			</div>
		</div>
	);
}

export default LandPage;