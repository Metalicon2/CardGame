import React from 'react';
import {PicList} from './PicList';
import Card from './Cards';
import emptyCard from './pictures/emptyCard.png';

const CardList = ({cardAmount, setCardState, cardState, cardItemArray}) => {

	console.log(cardItemArray);
	console.log(cardState);

	const calc = (card) => {
		let object = cardItemArray.filter(item => (item.id === card.id));
		if(object.length > 0) return true;
	}

	return (
		<div>
		{
			PicList.map((item, i) => {
				if(i >= cardAmount){return;}
				return(
					cardState && cardItemArray[0].id === item.id ? 
					<Card setCardState={setCardState} cardState={cardState} item={item} key={i}/>
					:
					<Card setCardState={setCardState} cardState={cardState} item={{src: emptyCard, id:item.id}} key={i}/>
				);
			})
		}
		</div>
	);
}

export default CardList;