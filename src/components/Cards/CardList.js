import React from 'react';
import {PicList} from './PicList';
import Card from './Cards';
import emptyCard from './pictures/emptyCard.png';

const CardList = ({cardAmount, setCardState, cardItemArray, restartState}) => {
	
	const getSource = (card) => {
		return PicList.find(item => item.id === card.id);
	}

	const findCard = (card) => {
		let cardObject = cardItemArray.find(item => item.id === card.id);
		if(cardObject) return true;
	}

	return (
		<div>
		{
			PicList.map((item, i) => {
				if(i >= cardAmount){
					return;
				}else if(restartState){
					PicList.forEach(item => {
						item.found = false;
					});
				}
				return(
					findCard(item) || item.found ? 
					<Card getSource={getSource} setCardState={setCardState} item={item} key={i}/>
					:
					<Card getSource={getSource} setCardState={setCardState} item={{src: emptyCard, id:item.id}} key={i}/>
				);
			})
		}
		</div>
	);
}

export default CardList;