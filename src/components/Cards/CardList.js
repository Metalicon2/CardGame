import React from 'react';
import {PicList} from './PicList';
import Card from './Cards';
import emptyCard from './pictures/emptyCard.png';

let cardIdArray = [];

const CardList = ({cardAmount, setCardState, cardState, cardID, clicks}) => {

	if(cardIdArray.length < 2 && cardID !== null){
		cardIdArray.push(cardID);
	}else{
		cardIdArray = [];
	}

	console.log(cardIdArray);

	return (
		<div>
		{
			PicList.map((item, i) => {
				if(i >= cardAmount){return;}
				return(
					cardState && cardIdArray.includes(item.id) ? 
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