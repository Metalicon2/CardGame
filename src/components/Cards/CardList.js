import React from 'react';
import {PicList} from './PicList';
import Card from './Cards';

const CardList = ({cardAmount}) => {
	return (
		<div>
		{
			PicList.map((item, i) => {
				if(i >= cardAmount){return;}
				return(
					<Card src = {item.src} key={i}/>
				);
			})
		}
		</div>
	);
}

export default CardList;