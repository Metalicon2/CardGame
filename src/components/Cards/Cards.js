import React from 'react';

const Cards = ({src}) => {
	return (
		<div className='bg-white dib br3 ma2 grow shadow-3'>
			<img alt='pic' src={src} width='150px'/>
		</div>
	);
}

export default Cards;