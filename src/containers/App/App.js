import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import LandPage from '../../components/LandPage/LandPage';
import GamePage from '../../components/GamePage/GamePage';
import Scroll from '../../components/Scroll/Scroll';
import {PicList} from '../../components/Cards/PicList';
import {useSelector, useDispatch} from 'react-redux';
import {
  incrementTryAction,
  resetTryAction,
  setBestAction,
  setGameOnAction,
  setPlayOnAction,
  setFoundPairs,
  incrementFoundPairs,
  setCardAmountAction,
  setPrevCardAmountAction,
  setResetCardAction,
  setCardItemArrayAction,
  setRouteAction
} from '../../actions/actions';

const App = () => {

  const dispatch = useDispatch();
  const tries = useSelector(state => state.tries);
  const best = useSelector(state => state.best);
  const gameOn = useSelector(state => state.gameOn);
  const playOn = useSelector(state => state.playOn);
  const foundPairs = useSelector(state => state.foundPairs);
  const cardAmount = useSelector(state => state.cardAmount);
  const prevCardAmount = useSelector(state => state.prevCardAmount);
  const resetCard = useSelector(state => state.resetCard);
  const cardItemArray = useSelector(state => state.cardItemArray);
  const route = useSelector(state => state.route);
  const [picList, setPicList] = useState(PicList);

  const initState = () => {
    dispatch(resetTryAction());
    dispatch(setFoundPairs(0));
  }

  const newGame = (where='landpage') => {
    initState();
    dispatch(setResetCardAction(true));
    onRouteChange('play');
    if(where === 'menu') setCardAmountFunc(prevCardAmount);
    if(cardAmount !== prevCardAmount) dispatch(setBestAction(0));
    dispatch(setGameOnAction(true));
    dispatch(setPlayOnAction(true));
  }

  const onRouteChange = (route) => {
    dispatch(setRouteAction(route));
  }

  const setCardAmountFunc = (amount) => {
    dispatch(setCardAmountAction(parseInt(amount)));
  }

  const setPrevCardAmountFunc = (amount) => {
    dispatch(setPrevCardAmountAction(parseInt(amount)));
  } 

  const checkIfCardIsNotSame = (item) => {
    if(cardItemArray[0]){
      if(item.id !== cardItemArray[0].id){
        return true;
      }
      return false;
    }
    return true;
  }

  const calcBestScore = () => {
    if(best > tries || best === 0){
      dispatch(setBestAction(tries));
    }
  }

  const isGameOver = () => {
    if(cardAmount / foundPairs === 2){
      dispatch(setPlayOnAction(false));
      calcBestScore();
      initState();
    }  
  }

  const setCardState = (item) => {
    if(cardItemArray.length < 2 && checkIfCardIsNotSame(item) && playOn){
      dispatch(setResetCardAction(false));
      dispatch(setCardItemArrayAction([...cardItemArray, item]));
      if(cardItemArray.length === 1){
        if(cardItemArray[0].src === item.src){
          let newArr = [...cardItemArray];
          newArr[0].found = true;
          dispatch(setCardItemArrayAction(newArr));
          item.found=true;
          dispatch(incrementFoundPairs(1));
        }
        dispatch(incrementTryAction(1));
        setTimeout(() => 
        {
          dispatch(setCardItemArrayAction([]));
        }, 1500);
      }
    }
  }

  useEffect(() => {
    const picList = JSON.parse(localStorage.getItem('picList'));
    picList === null ? setPicList(PicList) : setPicList(picList);
  }, []);

  useEffect(() => {
    localStorage.setItem('picList', JSON.stringify(picList));
    isGameOver();
  });

  return (
    <div>
      <Menu
        newGame={newGame}
        route={route}
        setCardAmount={gameOn ? setPrevCardAmountFunc : setCardAmountFunc}
        onRouteChange={onRouteChange}
        cardAmount={cardAmount}
      />
      {
        route === 'home' 
        ? 
        <LandPage 
          setCardAmount={setCardAmountFunc} 
          newGame={newGame}
        /> 
        : 
        <Scroll>
          <GamePage
            restartState = {resetCard}
            restart={newGame}
            tries= {tries}
            best= {best}
            cardItemArray={cardItemArray}
            cardAmount={cardAmount} 
            setCardState={setCardState}
            picList={picList}
          />
        </Scroll>
      }
    </div>
  );
}

export default App;
