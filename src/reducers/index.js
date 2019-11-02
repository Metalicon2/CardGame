import tryReducer from './tryReducer';
import bestReducer from './bestReducer';
import gameOnReducer from './gameOnReducer';
import playOnReducer from './playOnReducer';
import foundPairsReducer from './foundPairsReducer';
import cardAmountReducer from './cardAmountReducer';
import prevCardAmountReducer from './prevCardAmountReducer';
import resetCardReducer from './resetCardReducer';
import cardItemArrayReducer from './cardItemArrayReducer';
import picListReducer from './picListReducer';
import routeReducer from './routeReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    tries: tryReducer,
    best: bestReducer,
    gameOn: gameOnReducer,
    playOn: playOnReducer,
    foundPairs: foundPairsReducer,
    cardAmount: cardAmountReducer,
    prevCardAmount: prevCardAmountReducer,
    resetCard: resetCardReducer,
    cardItemArray: cardItemArrayReducer,
    picList: picListReducer,
    route: routeReducer
});

export default allReducers;