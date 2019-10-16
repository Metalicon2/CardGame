import React from 'react';

const Cards = ({item, setCardState, getSource}) => {

	return (
		<div onClick={() => setCardState(getSource(item))} className='bg-white dib br3 ma2 grow shadow-3'>
			<img alt='pic' src={item.src} width='125px'/>
		</div>
	);
}

export default Cards;