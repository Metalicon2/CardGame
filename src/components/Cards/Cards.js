import React from 'react';

const Cards = ({item, setCardState, cardState}) => {

	return (
		<div onClick={() => setCardState(item.id)} className='bg-white dib br3 ma2 grow shadow-3'>
			<img alt='pic' src={item.src} width='150px'/>
		</div>
	);
}

export default Cards;