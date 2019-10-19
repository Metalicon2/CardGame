import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import LandPage from '../../components/LandPage/LandPage';
import GamePage from '../../components/GamePage/GamePage';
import Scroll from '../../components/Scroll/Scroll';
import {PicList} from '../../components/Cards/PicList';

const App = () => {

  const [cardItemArray, setCardItemArray] = useState([]);
  const [tries, setTries] = useState(0);
  const [best, setBest] = useState(0);
  const [route, setRoute] = useState('home');
  const [cardAmount, setCardAmount] = useState(6);
  const [prevCardAmount, setPrevCardAmount] = useState(6);
  const [foundPairs, setFoundPairs] = useState(0);
  const [resetCard, setResetCard] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [playOn, setPlayOn] = useState(false);
  const [picList, setPicList] = useState(PicList);

  const initState = () => {
    setTries(0);
    setFoundPairs(0);
  }

  const newGame = (where='landpage') => {
    initState();
    setResetCard(true);
    onRouteChange('play');
    if(where === 'menu') {
      setCardAmountFunc(prevCardAmount);
      if(cardAmount !== prevCardAmount) setBest(0);
    }
    setGameOn(true);
    setPlayOn(true);
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const setCardAmountFunc = (amount) => {
    setCardAmount(amount);
  }

  const setPrevCardAmountFunc = (amount) => {
    setPrevCardAmount(amount);
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
      setBest(tries+1);
    }
  }

  const isGameOver = () => {
    if(cardAmount / foundPairs === 2){
      setPlayOn(false);
      calcBestScore();
      initState();
    }  
  }

  const setCardState = (item) => {
    if(cardItemArray.length < 2 && checkIfCardIsNotSame(item) && playOn){
      setResetCard(false);
      setCardItemArray([...cardItemArray, item]);
      if(cardItemArray.length === 1){
        if(cardItemArray[0].src === item.src){
          let newArr = [...cardItemArray];
          newArr[0].found = true;
          setCardItemArray(newArr);
          item.found=true;
          setFoundPairs(foundPairs+1);
        }
        setTimeout(() => 
        {
          setTries(tries+1);
          setCardItemArray([]);
        }, 1500);
      }
    }
  }

  useEffect(() => {
    const tries = localStorage.getItem('tries');
    const best = localStorage.getItem('best');
    const route = localStorage.getItem('route');
    const amount = localStorage.getItem('cardAmount');
    const gameOn = localStorage.getItem('gameOn');
    const playOn = localStorage.getItem('playOn');
    const foundPairs = localStorage.getItem('foundPairs');
    const resetCard = localStorage.getItem('resetCard');
    const cardItemArray = JSON.parse(localStorage.getItem('cardItemArray'));
    const picList = JSON.parse(localStorage.getItem('picList'));
    tries === null ? setTries(0) : setTries(tries);
    best === null ? setBest(0) : setBest(best);
    route === null ? onRouteChange('home') : onRouteChange(route);
    amount === null ? setCardAmount(6) : setCardAmount(amount);
    gameOn === null ? setGameOn(false) : setGameOn(gameOn);
    playOn === null ? setPlayOn(false) : setPlayOn(playOn);
    foundPairs === null ? setFoundPairs(0) : setFoundPairs(foundPairs);
    cardItemArray === null ? setCardItemArray([]) : setCardItemArray(cardItemArray);
    picList === null ? setPicList(PicList) : setPicList(picList);
  }, []);

  useEffect(() => {
    playOn ? localStorage.setItem('tries', tries) : localStorage.setItem('tries', 0);
    localStorage.setItem('best', best);
    localStorage.setItem('gameOn', gameOn);
    localStorage.setItem('playOn', playOn);
    localStorage.setItem('route', route);
    localStorage.setItem('cardAmount', cardAmount);
    localStorage.setItem('foundPairs', foundPairs);
    localStorage.setItem('cardItemArray', JSON.stringify(cardItemArray));
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
